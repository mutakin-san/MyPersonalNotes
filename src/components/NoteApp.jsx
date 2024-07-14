import React, { useEffect, useMemo, useState } from "react";

import { Route, Routes, useSearchParams } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddPage from "../pages/AddPage";
import DetailPage from "../pages/DetailPage";
import NoteHeader from "./NoteHeader";
import NotFoundPage from "../pages/NotFoundPage";
import PropTypes from "prop-types";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { addNote, archiveNote, deleteNote, getActiveNotes, getArchivedNotes, getNote, getUserLogged, putAccessToken, unarchiveNote } from "../utils/network-data";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LocaleProvider } from "../contexts/LocaleContext";
import { useTranslation } from "react-i18next";

class NoteApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            archivedNotes: [],
            query: this.props.searchQuery || '',
            authedUser: null,
            initializing: true,
        }

        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.getNote = this.getNote.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLogoutHandler = this.onLogoutHandler.bind(this);
    }


    async onDeleteHandler(id) {
        const { error } = await deleteNote(id);
        if(!error) {
            const { data: notes } = await getActiveNotes();
            const { data: archivedNotes } = await getArchivedNotes();
            this.setState({ notes, archivedNotes })
        }
    }

    async onArchiveHandler(id) {
        const { error } = await archiveNote(id);
        if(!error) {
            const { data: notes } = await getActiveNotes();
            const { data: archivedNotes } = await getArchivedNotes();
            this.setState({ notes, archivedNotes })
        }
    }

    async onUnarchiveHandler(id) {
        const { error } = await unarchiveNote(id);
        if(!error) {
            const { data: notes } = await getActiveNotes();
            const { data: archivedNotes } = await getArchivedNotes();
            this.setState({ notes, archivedNotes })
        }
    }


    async onAddNoteHandler(note) {
        const { error } = await addNote(note);
        if(!error) {
            const { data: notes } = await getActiveNotes();
            this.setState({ notes })
        }
    }


    async getNote(id) {
        const { error, data } = await getNote(id);
        if(!error) {
            return data;
        }

        return null;
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
        const {error,  data } = await getUserLogged();

        if(!error) {
            const { data: notes } = await getActiveNotes()
            const { data: archivedNotes } = await getArchivedNotes();
            this.setState({notes, archivedNotes, authedUser: data, initializing: false});
        } else {
            this.setState({initializing: false});
        }
    }

    render() {
        
        if(this.state.initializing) {
            return <div className="notes-app__loading">Loading...</div>;
        }

        if(this.state.authedUser === null) {
            return (
                <div className="notes-app">
                    <Routes>
                        <Route path="/*" element={<LoginPage onLoginSuccess={this.onLoginSuccess}  />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </div>
            );
        }   
        
        const filteredNotes = this.state.notes.filter((note) => {
            return note.title.toLowerCase().includes(this.state.query.toLowerCase()) || note.body.toLowerCase().includes(this.state.query.toLowerCase());
        });
        const filteredArchivedNotes = this.state.archivedNotes.filter((note) => {
            return note.title.toLowerCase().includes(this.state.query.toLowerCase()) || note.body.toLowerCase().includes(this.state.query.toLowerCase());
        });

        return (
            <div className="notes-app">
                <NoteHeader searchQuery={this.state.query} onQueryChange={this.onSearchHandler} logout={this.onLogoutHandler} name={this.state.authedUser.name} />
                <Routes>
                    <Route path="/" element={<HomePage notes={filteredNotes} archivedNotes={filteredArchivedNotes} onDelete={this.onDeleteHandler} onArchived={this.onArchiveHandler} onUnarchived={this.onUnarchiveHandler} />} />
                    <Route path="/notes/:id" element={<DetailPage getNote={this.getNote} onDelete={this.onDeleteHandler} onArchived={this.onArchiveHandler} onUnarchived={this.onUnarchiveHandler} />} />
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
    const { i18n: { changeLanguage} } = useTranslation();
    const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const toggleLocale = () => {
        setLocale((prevLocale) => {
            const newLocale = prevLocale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
            return newLocale;
        });
    }

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    }

    const localeContextValue = useMemo(() => {
        return {
            locale,
            toggleLocale
        }
    }, [locale]);


    const themeContextValue = useMemo(() => {
        return {
            theme,
            toggleTheme
        }
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        changeLanguage(locale);
    }, [locale, theme]);

    return (
        <LocaleProvider value={localeContextValue}>
            <ThemeProvider value={themeContextValue}>
                <NoteApp searchQuery={query} onSearch={changeSearchParams} />
            </ThemeProvider>
        </LocaleProvider>
    );

}

export default NoteAppWrapper;