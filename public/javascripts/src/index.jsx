import * as React from "react";
import * as ReactDOM from "react-dom";
import _ from "underscore";

/*
var host = location.origin.replace(/^http/, 'ws').replace('light', 'lightSocket');

const socket = io.connect(host, {
    transports: ["polling", "websocket"]
});
*/

class TypeChooser extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        var type = this.props.type,
            typeBlink = 'blink',
            type3d = '3d';
        return (
            <div>
                <h2>Choose light-motion type</h2>
                <div className="type-chooser">
                    <span
                        className={'chooser-span ' + (type === typeBlink ? 'checked' : '')}
                        onClick={this.props.changeBlinkerType.bind(this, typeBlink)}>
                        Light-blinking image/text
                    </span>
                    <span
                        className={'chooser-span ' + (type === type3d ? 'checked' : '')}
                        onClick={this.props.changeBlinkerType.bind(this, type3d)}>
                        3D text
                    </span>
                </div>
            </div>
        );
    }
}

class UploadChooser extends React.Component {
    render() {
        var uploadType = this.props.uploadType;
        var blinkerType = this.props.blinkerType;

        var types = [
                {
                    type: 'text',
                    text: 'Input Text',
                    key: '0'
                },{
                    type: 'url',
                    text: 'Image URL',
                    key: '1'
                }
            ];
        var typesView = [];

        if (blinkerType === '3d') {
            return false;
        }


        types.forEach((type) => {
            typesView.push(
                <span
                    className={'chooser-span ' + (type.type === uploadType ? 'checked' : '')}
                    onClick={this.props.changeUploadType.bind(this, type.type)} key={type.key}>
                    {type.text}
                </span>
            );
        });

        return (
            <div>
                <h3>Choose Upload type</h3>
                <div className="upload-chooser">
                    {typesView}
                </div>
            </div>
        );
    }
}

class FileUpload extends React.Component {
    render() {
        return (<div></div>);
    }
}

class WordInput extends React.Component {
    render() {
        return (
            <div>
                <input value={this.props.text} onChange={this.props.onTextInput.bind(this)}></input>
            </div>
        );
    }
}

class ImageUrlInput extends React.Component {
    render() {
        return (<div></div>);
    }
}

class InputField extends React.Component {
    render() {
        var field;
        if (this.props.blinkerType === '3d' || (this.props.blinkerType === 'blink' && this.props.uploadType === 'text')) {
           field = (
               <WordInput text={this.props.text} onTextInput={this.props.onTextInput.bind(this)} />
           );
        } else if (this.props.blinkerType === 'blink' && this.props.uploadType === 'url') {
            field = (
                <ImageUrlInput url={this.props.url} onURLInput={this.props.onURLInput.bind(this)} />
            );
        }
        return (
            <div className="input-field">{field}</div>
        )
    }
}

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            blinkerType: 'blink',
            uploadType: 'text',
            sourceType: 'imageURL',
            savedText: window.localStorage.savedText || '',
            imageURL: window.localStorage.imageURL || ''
        }
    }

    changeUploadType(type) {
        this.state.uploadType = type;
        this.setState(this.state);
    }

    changeBlinkerType(type) {
        this.state.blinkerType = type;
        this.setState(this.state);
    }

    onTextInput(e) {
        var value = e.target.value;
        this.state.savedText = value;

        window.localStorage.savedText = value;
        this.setState(this.state);
    }

    onURLInput(e) {
        return false;
    }

    render() {
        return (
            <div>
                {/*
                <TypeChooser
                    changeBlinkerType={this.changeBlinkerType.bind(this)}
                    type={this.state.blinkerType} />
                <UploadChooser
                    changeUploadType={this.changeUploadType.bind(this)}
                    uploadType={this.state.uploadType}
                    blinkerType={this.state.blinkerType}
                    />
                */}
                <InputField
                    onTextInput={this.onTextInput.bind(this)}
                    onURLInput={this.onURLInput.bind(this)}
                    url={this.state.imageURL}
                    text={this.state.savedText}
                    blinkerType={this.state.blinkerType}
                    uploadType={this.state.uploadType}
                    />

                <a href="show">Go to blinker</a>

            </div>
        )
    }
}

export function start() {
    /*socket.on('testEvent', function(data){
        console.log(data);
    }); */

    ReactDOM.render(
        <Index />,
        document.getElementById('app')
    );
}