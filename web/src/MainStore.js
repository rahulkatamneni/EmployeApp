import assign from 'object-assign';
import AppDispatcher from '../src/flux/AppDispatcher';
//import AppDispatcher from './flux/AppDispatcher';

var {EventEmitter} = require('fbemitter');

var emitter = new EventEmitter();

var CHANGE_EVENT = 'change';

// User defined variables   --- START

var user = null;
var activeItem = null;
var makeCall = false;
var headerMenu = null;
var printFlag = false;
var candidateNames = [];
var clickedItem = '';
//var screen='';
//var pscreen='';

// User defined variables   --- END

var MainStore = assign({}, EventEmitter.prototype, {


    // User defined functions   --- START

    getUser() {
        return user;
    },

    getMakeCall() {
        return makeCall;
    },
    /*getScreen() {
        return screen;
    },
    getPscreen() {
        return pscreen;
    },
*/
    getActiveItem() {
        return activeItem;
    },

    getClickedItem() {
        return clickedItem;
    },

    setActiveItem(value) {
        activeItem = value;
    },

    setCandidateNames(values) {
        candidateNames = values;
    },
    getCandidateNames() {
        return candidateNames;
    },

    getHeaderMenu() {
        return headerMenu;
    },

    setHeaderMenu(value) {
        headerMenu = value;
    },

    getPrintFlag() {
        return printFlag;
    },

    // User defined functions   --- END


    getAppDispatcher: function () {
        return AppDispatcher;
    },

    emitChange: function (subType) {
        var subType = subType || CHANGE_EVENT;
        emitter.emit(CHANGE_EVENT, subType, subType);
    },

    addChangeListener: function (callback) {
        var token = emitter.addListener(CHANGE_EVENT, callback);
        return token;
    },

    dispatcherIndex: AppDispatcher.register(function (payload) {
        var action = payload.action;

        switch (action.actionType) {
            case "setUser":
                user = action.user;
                MainStore.emitChange(action.actionType);
                break;
        }

        return true; // No errors. Needed by promise in Dispatcher.
    })

});

export default MainStore;