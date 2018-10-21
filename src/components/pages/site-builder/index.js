import grapesjs from 'grapesjs'
import pluginAviary from 'grapesjs-aviary'
import pluginBlocksBasic from 'grapesjs-blocks-basic'
import pluginBlocksFlexbox from 'grapesjs-blocks-flexbox'
import pluginIndexedDB from 'grapesjs-indexeddb'
import pluginCKEditor from 'grapesjs-plugin-ckeditor'
import pluginExport from 'grapesjs-plugin-export'
import pluginFilestack from 'grapesjs-plugin-filestack'
import pluginForms from 'grapesjs-plugin-forms'
import pluginGradient from 'grapesjs-style-gradient'

import commands from './commands'
import blocks from './blocks'
import components from './components'
import panels from './panels'
import styles from './styles'

export default grapesjs.plugins.add('gjs-preset-webpage', (editor, opts = {}) => {
  let config = opts

  let defaults = {
    // Which blocks to add
    blocks: ['link-block', 'quote', 'text-basic'],

    // Modal import title
    modalImportTitle: 'Import',

    // Modal import button text
    modalImportButton: 'Import',

    // Import description inside import modal
    modalImportLabel: '',

    // Default content to setup on import model open.
    // Could also be a function with a dynamic content return (must be a string)
    modalImportContent: editor => editor.getHtml(),

    // Code viewer (eg. CodeMirror) options
    importViewerOptions: {},

    // Confirm text before cleaning the canvas
    textCleanCanvas: 'Are you sure to clean the canvas?',

    // Show the Style Manager on component change
    showStylesOnChange: 1,

    // Text for General sector in Style Manager
    textGeneral: 'General',

    // Text for Layout sector in Style Manager
    textLayout: 'Layout',

    // Text for Typography sector in Style Manager
    textTypography: 'Typography',

    // Text for Decorations sector in Style Manager
    textDecorations: 'Decorations',

    // Text for Extra sector in Style Manager
    textExtra: 'Extra',

    // Use custom set of sectors for the Style Manager
    customStyleManager: [],

    // `grapesjs-aviary` plugin options, disabled by default
    // Aviary library should be included manually
    // By setting this option to `false` will avoid loading the plugin
    aviaryOpts: 0,

    // `grapesjs-blocks-basic` plugin options
    // By setting this option to `false` will avoid loading the plugin
    blocksBasicOpts: {},

    // `grapesjs-blocks-flexbox` plugin options
    // By setting this option to `false` will avoid loading the plugin
    blocksFlexboxOpts: {},

    // `grapesjs-indexeddb` plugin options
    // By setting this option to `false` will avoid loading the plugin
    indexedDBOpts: {},

    // `grapesjs-plugin-ckeditor` plugin options
    // By setting this option to `false` will avoid loading the plugin
    ckEditorOpts: {},

    // `grapesjs-plugin-export` plugin options
    // By setting this option to `false` will avoid loading the plugin
    exportOpts: {},

    // `grapesjs-plugin-filestack` plugin options, disabled by default
    // Filestack library should be included manually
    // By setting this option to `false` will avoid loading the plugin
    filestackOpts: 0,

    // `grapesjs-plugin-forms` plugin options
    // By setting this option to `false` will avoid loading the plugin
    formsOpts: {},

    // `grapesjs-style-gradient` plugin options
    // By setting this option to `false` will avoid loading the plugin
    styleGradientOpts: {},

    // `grapesjs-navbar` plugin options
    // By setting this option to `false` will avoid loading the plugin
    navbarOpts: false,

    // `grapesjs-component-countdown` plugin options
    // By setting this option to `false` will avoid loading the plugin
    countdownOpts: false
  }

  // Load defaults
  for (let name in defaults) {
    if (!(name in config)) {
      config[name] = defaults[name]
    }
  }

  const {
    aviaryOpts,
    blocksBasicOpts,
    blocksFlexboxOpts,
    indexedDBOpts,
    ckEditorOpts,
    exportOpts,
    filestackOpts,
    formsOpts,
    styleGradientOpts
  } = config

  // Load plugins
  aviaryOpts && pluginAviary(editor, aviaryOpts)
  blocksBasicOpts && pluginBlocksBasic(editor, blocksBasicOpts)
  blocksFlexboxOpts && pluginBlocksFlexbox(editor, blocksFlexboxOpts)
  indexedDBOpts && pluginIndexedDB(editor, indexedDBOpts)
  // ckEditorOpts && pluginCKEditor(editor, ckEditorOpts)
  exportOpts && pluginExport(editor, exportOpts)
  filestackOpts && pluginFilestack(editor, filestackOpts)
  formsOpts && pluginForms(editor, formsOpts)
  styleGradientOpts && pluginGradient(editor, styleGradientOpts)

  // Load components
  components(editor, config)

  // Load blocks
  blocks(editor, config)

  // Load commands
  commands(editor, config)

  // Load panels
  panels(editor, config)

  // Load styles
  styles(editor, config)
})
