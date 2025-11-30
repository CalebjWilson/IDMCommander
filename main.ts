import{App,Editor,MarkdownView,Modal,Notice,Plugin,PluginSettingTab,Setting, WorkspaceLeaf} from 'obsidian';
import{DBBrowser, VIEW_BROWSER_ID} from 'dbbrowser'
interface IDMCommanderPluginSettings { DataBasePath: string; }
const DEFAULT_SETTINGS: IDMCommanderPluginSettings = {
    DataBasePath: 'NULL'
}

export default class IDMCommander extends Plugin {
    settings: IDMCommanderPluginSettings;

    async onload()
    {
        console.log('IDMCommander is Loading...');


            this.registerView(
        VIEW_BROWSER_ID,
        (leaf) => new DBBrowser(leaf)
        );


        		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (_evt: MouseEvent) => {
			// Called when the user clicks the icon.
            this.activateView(VIEW_BROWSER_ID);
			new Notice('This is a notice!');
		});

        this.addCommand({
            id:'my-command',
            name:'do my command things',
            callback: () => {new SampleModal(this.app).open}
        })



    }
    async onunload(){}

    async loadSettings(){ this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())}
    async saveSettings(){await this.saveData(this.settings)}

    
 async activateView(ViewID = '') {
    const { workspace } = this.app;

    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(ViewID);

    if (leaves.length > 0) {
      // A leaf with our view already exists, use that
      leaf = leaves[0];
    } else {
      // Our view could not be found in the workspace, create a new leaf
      // in the right sidebar for it
      leaf = workspace.getRightLeaf(false);
      await leaf.setViewState({ type: ViewID, active: true });
    }

    // "Reveal" the leaf in case it is in a collapsed sidebar
    workspace.revealLeaf(leaf);
  }

}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: IDMCommander;

	constructor(app: App, plugin: IDMCommander) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.DataBasePath)
				.onChange(async (value) => {
					this.plugin.settings.DataBasePath = value;
					await this.plugin.saveSettings();
				}));
	}
}