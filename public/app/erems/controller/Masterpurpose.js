Ext.define('Erems.controller.Masterpurpose', {
    extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse', 'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Masterpurpose',
    views: ['masterpurpose.Panel', 'masterpurpose.Grid', 'masterpurpose.FormSearch', 'masterpurpose.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'masterpurposegrid'
        },
        {
            ref: 'formsearch',
            selector: 'masterpurposeformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masterpurposeformdata'
        }
    ],
    controllerName: 'masterpurpose',
    fieldName: 'purpose',
    bindPrefixName: 'Masterpurpose',
    localStore: {
        detail: null,
        selectedUnit: null,
        customer: null
    },
    browseHandler: null,
    cbf: null,
    mt: null,
    formxWinId: 'win-purposewinId',
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init: function(application) {
        var me = this;

        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();

        this.control({
            'masterpurposepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'masterpurposegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                listeners       : { //edited by Rizal 1 Maret 2019
                    load : function () {
                        me.jqueryBinding();
                    }
                }
            },
            'masterpurposegrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'masterpurposegrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'masterpurposegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterpurposegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masterpurposegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterpurposeformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterpurposeformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterpurposeformdata': {
                afterrender: this.formDataAfterRender
            },
            'masterpurposeformdata button[action=save]': {
                click: this.mainDataSave
            },
            'masterpurposeformdata button[action=cancel]': {
                click: this.formDataClose
            }

        });
    },
    fdar: function() {
        return this.tools.fdar(this);

    },
    mainDataSave: function() {
        var me = this;

        me.tools.iNeedYou(me).save();
    },
    gridAfterRender: function (configs) {
        this.callParent(arguments);
        var me = this;
        var grid = me.getGrid();

        grid.up('window').body.mask('Loading configuration ...');

        grid.store.on('load', function (store, records, options) {
            me.jqueryBinding();
        });
        // me.getGrid().down("pagingtoolbar").getStore().reload();

        grid.up('window').body.unmask();
    },
    jqueryBinding : function () {
        var me = this;
        //inlineEdit
        me.checkboxInlineEdit('use_target_sales');
    },
    checkboxInlineEdit : function (name) {
        var me = this;
        $("input[name='" + name + "']").change(function (event) {
            var val               = $(this).is(":checked") ? 1 : 0;
            var y                 = $(this);
            var purpose_id = $(this).attr('data');
            var grid = me.getGrid();

            if (name == 'use_target_sales') { /// Add by Rico 23082022
                Ext.MessageBox.show({
                    title   : "Target Sales",
                    msg     : 'Are you sure you want to proceed?',
                    buttons : Ext.MessageBox.OKCANCEL,
                    icon    : Ext.MessageBox.WARNING,
                    fn      : function (btn) {
                        if (btn == 'ok') {
                            grid.setLoading("Please wait");
                            me.tools.ajax({
                                params  : { id: purpose_id, collumn: name, value: val },
                                success : function (data) { grid.setLoading(false); }
                            }).read('inlineEdit');
                        } else {
                            var chk = val > 0 ? false : true;
                            y.prop("checked", chk);
                        }
                    }
                });
            }
        });
    }, 
});