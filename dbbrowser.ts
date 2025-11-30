import{App,Editor,MarkdownView,Modal,Notice,Plugin,PluginSettingTab,Setting} from 'obsidian';

import { ItemView, WorkspaceLeaf } from 'obsidian';




export const VIEW_BROWSER_ID = 'IDMCommander_ItemBrowser';


export class DBBrowser extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_BROWSER_ID;
  }

  getDisplayText() {
    return 'Item Browser';
  }

  async onOpen() {
    const container = this.contentEl;
    container.empty();
	const book = container.createEl('div', { cls: 'test' });
	book.createEl('div', { text: 'Title', cls: 'test__title' });
	book.createEl('small', { text: 'Sub-text', cls: 'test__subtitle' });
  }

  async onClose() {
    // Nothing to clean up.
  }
}