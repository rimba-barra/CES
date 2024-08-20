Ext.define('Erems.controller.Serahterima', {
   extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse', 
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Serahterima',
    views: ['serahterima.Panel', 'serahterima.Grid', 'serahterima.FormSearch', 'serahterima.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'serahterimagrid'
        },
        {
            ref: 'formsearch',
            selector: 'serahterimaformsearch'
        },
        {
            ref: 'formdata',
            selector: 'serahterimaformdata'
        },
        {
            ref: 'unitgrid',
            selector: 'serahterimaunitgrid'
        },
        {
            ref: 'panel',
            selector: 'serahterimapanel'
        }
    ],
    controllerName: 'serahterima',
    fieldName: 'serahterima_id',
    formWidth: 800,
    bindPrefixName:'Serahterima',
    localStore: {
        detail: null,
        selectedUnit: null,
        customer: null
    },
    browseHandler: null,
    cbf: null,
    mt: null,
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
            'serahterimapanel': {
                afterrender: this.panelAfterRender,
                beforerender: me.mainPanelBeforeRender
             
            },
            'serahterimagrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'serahterimagrid toolbar button[action=create]': {
                click: function() {
                    me.instantWindow('FormData', 800, 'Form Serah Terima', 'create');
                }
            },
            'serahterimagrid toolbar button[action=update]': {
                click: function() {
                    me.instantWindow('FormData', 800, 'Form Serah Terima', 'update');
                }
            },
            'serahterimagrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'serahterimagrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'serahterimagrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'serahterimaformsearch button[action=search]': {
                click: this.dataSearch
            },
            'serahterimaformsearch button[action=reset]': {
                click: this.dataReset
            },
            'serahterimaformdata': {
                afterrender: this.formDataAfterRender
            },
            'serahterimaformdata button[action=save]': {
                click: this.mainDataSave
            },
            'serahterimaformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'serahterimaformdata button[action=browse_unit]': {
                click: this.browseSoldUnit
            },
            'serahterimaunitgrid button[action=select]': {
                click: this.unitSelect
            },
        });
    },
    
    mainDataSave: function() {
        var me = this;
        Ext.Msg.confirm('Update Data', 'Proses ini akan mengubah rencana serah terima pada SPT dan SPPJB. Apakah anda yakin?', function(btn) {
            if (btn == 'yes') {
                me.tools.iNeedYou(me).save();
            }
        });
        
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();

        me.mt = new Erems.library.ModuleTools();
        

        //
        var x = {
            init: function() {

                me.setActiveForm(f);
                
                me.localStore.detail = me.instantStore({
                    id: me.controllerName + 'MainSerahterima',
                    extraParams: {
                        mode_read: 'maindetail'
                    },
                    idProperty: 'serahterima_id'
                });
            },
            create: function() {
                var that = this;
                f.editedRow = -1;
                me.tools.ajax({
                    params: {
                        // purchaseletter_id: plId
                    },
                    success: function (data, model) {

                        me.fillFormComponents(data, f);
                        
                        me.localStore.detail.load({
                            params: {
                                serahterima_id: 0
                            },
                            callback: function (rec, op) {
                                me.attachModel(op, me.localStore.detail, false);

                            }
                        });
                    }
                }).read('detail');

            },
            update: function() {
                var that = this;
                f.editedRow = me.getGrid().getSelectedRow();
                var rec = me.getGrid().getSelectedRecord();
                f.down("#btnUnit").setVisible(false);
                f.down("[name=serahterima_date]").setValue(me.getGrid().getSelectedRecord().get("serahterima_date"));
                f.loadRecord(rec);
                me.tools.ajax({
                    params: {
                        // purchaseletter_id: plId
                    },
                    success: function (data, model) {

                        //me.fillFormComponents(data, f);
                        
                        me.localStore.detail.load({
                            params: {
                                serahterima_id: me.getGrid().getSelectedRecord().get("serahterima_id")
                            },
                            callback: function(rec, op) {
                                me.attachModel(op, me.localStore.detail, false);
                                var rec = me.localStore.detail.getAt(0);
                                
                                f.loadRecord(rec);
                            }
                        });
                    }
                }).read('detail');
            }
            
        };
        return x;
    },
    browseSoldUnit: function (el) {
        var me = this;
        var browse = new Erems.library.Browse();
        browse.init({
            controller: me,
            view: 'UnitGrid',
            el: el,
            localStore: "selectedUnit",
            mode_read: "selectedunit"
        });
        browse.showWindow();
    },
    
    unitSelect: function () {
        var me = this;
        if (me.browseHandler) {
            me.browseHandler.selectItem(function (rec) {
                var f = me.getFormdata();

                me.tools.ajax({
                    params: {
                        purchaseletter_id: rec.get("purchaseletter_id")
                    },
                    success: function (data, model) {
                        var isallowed = data['others'][0][0]['ISALLOWED'];
                        var msg = data['others'][0][0]['MSG'];
                        if (isallowed) {

                        } else {
                            me.tools.alert.warning(msg);
                        }

                    }
                }).read('checkunit');

                f.down("[name=purchaseletter_purchaseletter_id]").setValue(rec.get("purchaseletter_id"));


            });
        }
    },
});