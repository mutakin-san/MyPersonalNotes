import React from "react";

import { getInitialData } from "../utils/index";
import { Route, Routes, useSearchParams } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddPage from "../pages/AddPage";
import DetailPage from "../pages/DetailPage";
import NoteHeader from "./NoteHeader";
import NotFoundPage from "../pages/NotFoundPage";
import PropTypes from "prop-types";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { getUserLogged, putAccessToken } from "../utils/network-data";

class NoteApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: getInitialData(),
            query: this.props.searchQuery || '',
            authedUser: null,
            initializing: true,
        }

        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.getNote = this.getNote.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLogoutHandler = this.onLogoutHandler.bind(this);
    }


    onDeleteHandler(id) {
        const notes = this.state.notes.filter(note => note.id !== id);
        this.setState({ notes })
    }

    onArchiveHandler(id) {
        const updatedNotes = this.state.notes.map(note =>
            note.id === id ? { ...note, archived: !note.archived } : note
        );
        this.setState({ notes: updatedNotes })
    }


    onAddNoteHandler({ title, body }) {
        const newNote = {
            id: +new Date(),
            title: title,
            body: body,
            archived: false,
            createdAt: (new Date()).toISOString(),
        };

        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    newNote,
                ]
            }
        });
    }


    getNote(id) {
        return this.state.notes.find((note) => note.id == id);
    }

    onSearchHandler(query) {
        this.setState({ query })
        this.props.onSearch(query)
    }

    async onLoginSuccess({accessToken}) {
        putAccessToken(accessToken);
        const { data } = await getUserLogged();

        this.setState({ authedUser: data });
    }

    async onLogoutHandler() {
        this.setState({ authedUser: null });
        putAccessToken('');
    }


    async componentDidMount() {
        const { data } = await getUserLogged();
        this.setState({ authedUser: data, initializing: false });
    }

    render() {
        const filteredNotes = this.state.notes.filter(note => note.title.toLowerCase().includes(this.state.query.toLowerCase()));

        if(this.state.initializing) {
            return null;
        }

        if(this.state.authedUser === null) {
            return <div className="notes-app">
                <Routes>
                    <Route path="/*" element={<LoginPage onLoginSuccess={this.onLoginSuccess}  />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </div>   
        }

        return (
            <div className="notes-app">
                <NoteHeader searchQuery={this.state.query} onQueryChange={this.onSearchHandler} logout={this.onLogoutHandler} name={this.state.authedUser.name} />
                <Routes>
                    <Route path="/" element={<HomePage notes={filteredNotes} onDelete={this.onDeleteHandler} onArchived={this.onArchiveHandler} />} />
                    <Route path="/notes/:id" element={<DetailPage getNote={this.getNote} onDelete={this.onDeleteHandler} onArchived={this.onArchiveHandler} />} />
                    <Route path="/notes/add" element={<AddPage addNote={this.onAddNoteHandler} />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        );
    }
}

NoteApp.propTypes = {
    searchQuery: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
}

function NoteAppWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("query")

    function changeSearchParams(query) {
        setSearchParams({ query });
    }

    return <NoteApp searchQuery={query} onSearch={changeSearchParams} />

}

export default NoteAppWrapper;