import { Window } from "../components/basic/Window";
import { Windows } from "../config/windows";

/**
 * View controller. Manages the windows (see Window.ts).
 */
export class ViewController {
    public history: Windows[] = []; // history of the windows that were shown

    public windows: { [ key: string ]: Window } = {}; // windows registry

    public active!: Windows; // currently active window
    
    // add window to the registry
    add(
        id: Windows, // id of the window
        window: Window, // window component
        visible = false // window visibility flag
        ) {
        this.windows[id] = window; // add window to the registry

        if (!visible) { // if window is not visible
            window.hide(true); // hide the window
        }
    }

    // remove window from the registry
    remove(
        id: Windows // id of the window
        ) {
        delete this.windows[id]; // remove window from the registry
    } 

    // show window
    async show(
        id: Windows, // id of the window
        force = false // force parameter is used to show the window without animation
        ) { 
        if (!this.windows[id]) { // if window does not exist
            throw new Error(`Window "${Windows[id]}" does not exist`); // throw error
        }
        
        if (this.active === id) return; // if window is already active, return
        
        this.history.push(id); // add window to the history

        this.active = id; // set active window ID

        for (const key in this.windows) { // iterate through all windows in registry
            await this.windows[key].hide(); // hide window
        }

        await this.windows[id].show(force); // show window by id
    }

    // hide window
    async hide(
        id: Windows, // id of the window
        force = false // force parameter is used to hide the window without animation
        ) { 
        await this.windows[id].hide(force); // hide window by id
    }

    // get window by id
    get (
        id: Windows // id of the window
        ) {
        return this.windows[id]; // return window by id
    }

    // shw previous window from the history
    async goBack() {
        if (this.history.length > 1) { // if there is more than 1 window in the history
            this.history.pop(); // remove last window from the history
        }

        await this.show(this.history[this.history.length - 1]); // show previous window from the history
    }
}