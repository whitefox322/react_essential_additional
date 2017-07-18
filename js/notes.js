var Colors = React.createClass({
    render: function () {
        var pick = this.props.pick;
        var style = {backgroundColor: this.props.color};
        var span = "glyphicon glyphicon-ok icon-span";

        if(pick !== this.props.color) {
            span = "glyphicon glyphicon-tint icon-span";
        }

        return (
            <div className="color-span" style={style} onClick={this.props.clickColor}>
                <span className={span}></span>
            </div>
        )
    }
});

var Note = React.createClass({
    render: function () {
        var style = {backgroundColor: this.props.color};

        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> × </span>
                {this.props.children}
            </div>
        );
    }
});

var NoteEditor = React.createClass({
    getInitialState: function () {
        return {
            text: '',
            color: "#FFD700"
        };
    },

    handleTextChange: function (event) {
        this.setState({text: event.target.value});
    },

    handleNoteAdd: function () {
        var newNote = {
            text: this.state.text,
            color: this.state.color,
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);
        this.setState({text: ''});
    },

    changeColor: function (color) {
        this.setState({color: color.color});
    },

    render: function () {
        var changeColor = this.changeColor;
        var pick = this.state.color;

        return (
            <div className="note-editor">
                <textarea
                    placeholder="Enter your note here..."
                    rows={5}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <div className="notes-colors">
                    {
                        this.props.colors.map(function (color) {
                            return (
                                <Colors
                                    key={color.id}
                                    clickColor={changeColor.bind(null, color)}
                                    color={color.color}
                                    pick={pick}>
                                </Colors>
                            );
                        })
                    }
                </div>
                <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
            </div>
        );
    }
});

var NotesGrid = React.createClass({
    componentDidMount: function () {
        var grid = this.refs.grid;
        this.msnry = new Masonry(grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    },

    componentDidUpdate: function (prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },

    render: function () {
        var onNoteDelete = this.props.onNoteDelete;

        return (
            <div className="notes-grid" ref="grid">
                {
                    this.props.notes.map(function (note) {
                        return (
                            <Note
                                key={note.id}
                                onDelete={onNoteDelete.bind(null, note)}
                                color={note.color}>
                                {note.text}
                            </Note>
                        );
                    })
                }
            </div>
        );
    }
});

var NotesApp = React.createClass({
    getInitialState: function () {
        return {
            notes: [],
            colors: [{
                id: 0,
                color: "#FFD700"
            }, {
                id: 1,
                color: "#20B2AA"
            }, {
                id: 2,
                color: "#90EE90"
            }, {
                id: 3,
                color: "#FFA07A"
            }, {
                id: 4,
                color: "#5F9EA0"
            }]
        };
    },

    componentDidMount: function () {
        var localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({notes: localNotes});
        }
    },

    componentDidUpdate: function () {
        this._updateLocalStorage();
    },

    handleNoteDelete: function (note) {
        var noteId = note.id;
        var newNotes = this.state.notes.filter(function (note) {
            return note.id !== noteId;
        });
        this.setState({notes: newNotes});
    },

    handleNoteAdd: function (newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({notes: newNotes});
    },

    render: function () {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <NoteEditor colors={this.state.colors} onNoteAdd={this.handleNoteAdd}/>
                <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete}/>
            </div>
        );
    },

    _updateLocalStorage: function () {
        var notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }
});

ReactDOM.render(
    <NotesApp/>,
    document.getElementById('mount-point')
);