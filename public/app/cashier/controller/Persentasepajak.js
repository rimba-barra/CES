Ext.define('Cashier.controller.Persentasepajak', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Mastertipepajakcombo',
        'Cashier.library.template.combobox.Kelaskontraktorcombobox',
        'Cashier.library.template.combobox.Tipekontraktorcombobox',
        'Cashier.library.template.combobox.Masterpajakcombobox'
    ],
    alias: 'controller.persentasepajak',
    views: [
        'persentasepajak.FormSearch',
        'persentasepajak.Grid',
        'persentasepajak.FormData',
        'persentasepajak.Panel'
    ],
    stores: [
        'Persentasepajak',
        'Project',
        'Pt',
        'Mastertipepajak',
        'Kelaskontraktorcombobox',
        'Tipekontraktorcombobox',
        'Masterpajak'
    ],
    models: [
        'Persentasepajak',
        'Project',
        'Pt',
        'Mastertipepajak',
        'Kelaskontraktorcombobox',
        'Tipekontraktorcombobox',
        'Masterpajak'
    ],
    refs: [
        { ref: 'grid', selector: 'persentasepajakgrid' },
        { ref: 'formsearch', selector: 'persentasepajakformsearch' },
        { ref: 'formdata', selector: 'persentasepajakformdata' },
        { ref: 'panel', selector: 'persentasepajakpanel' }
    ],
    controllerName: 'persentasepajak',
    fieldName: 'persentasepajak_id',
    bindPrefixName: 'Persentasepajak',
    formWidth: 500,
    win: null,
    winId: null,
    init: function(application) {
        var me = this;
        this.control({
            'persentasepajakpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.formSearchAfterRenderCustom
            },
            'persentasepajakgrid': {
                afterrender: me.gridAfterRender,
                itemdblclick: me.gridItemDblClick,
                itemcontextmenu: me.gridItemContextMenu,
                selectionchange: me.gridSelectionChange
            },
            'persentasepajakgrid [action=create]': {
                click: function() {
                    var me = this;
                    me.instantWindow('FormData', 500, 'Add New Persentase Pajak', 'create', 'addNewPersentasepajak', me.controllerName);
                }
            },
            'persentasepajakformsearch': {
                afterrender: function() {
                    var me = this;
                    var f = me.getFormsearch();

                    f.down("[name=tipepajakdetail_id]").getStore().load();
                    f.down("[name=tipepajak_id]").getStore().load();
                }
            },
            'persentasepajakformsearch [action=search]': {
                click: me.dataSearch
            },
            'persentasepajakformsearch [action=reset]': {
                click: me.dataReset
            },
            'persentasepajakformsearch [name=project_id]': {
                change: function(dis, newValue, oldValue, eOpts) {
                    var me = this;
                    var f = me.getFormsearch();
                    var project_id = dis.value; 
                    this.loadPtbyProject(project_id, f);
                }
            },
            'persentasepajakformdata': {
                afterrender: function(v) {
                    var me = this;
                    var f = me.getFormdata();
                    this.loadProject(f);

                    var storedetail = f.down("[name=tipepajakdetail_id]").getStore();
                    storedetail.clearFilter();
                    f.down("[name=tipepajakdetail_id]").getStore().load();
                    storedetail.on('load', function () {
                        storedetail.filterBy(function (record){
                            return true;
                        });
                    });
                    f.down("[name=kelaskontraktor_id]").getStore().load();
                    f.down("[name=tipekontraktor_id]").getStore().load();

                    var state = v.up('window').state;
                    me.formDataAfterRender(f);
                }
            },
            'persentasepajakformdata [name=project_id]': {
                change: function(dis, newValue, oldValue, eOpts) {
                    var me = this;
                    var f = me.getFormdata();
                    var project_id = dis.value;
                    this.loadPtbyProject(project_id, f);
                }
            },
            'persentasepajakformdata [action=save]': {
                click: function() {
                    this.saveData();
                }
            }
        })
    },
    formSearchAfterRenderCustom: function() {
        var me;
        me = this;

        var f = me.getFormsearch();
        this.loadProject(f);        
    },
    loadProject: function(f) {

        var me = this;
        var storeproject;

        storeproject = me.getStore('Project');
        storeproject.load({
            params: {
                "hideparam": 'projectpt',
                "project_id": apps.project,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                        f.down("[name=project_id]").setValue(parseInt(apps.project));                       
                    }
                }
            }

        });   
    },
    loadPtbyProject: function(projectid, f){

        var me = this;

        var storecoa = me.getStore('Pt');
        storecoa.load({
            params: {
                "hideparam": 'getptbyuserproject',
                "start": 0,
                "limit": 1000000,
                "project_id": projectid,
                "user_id": apps.uid
            },
            callback: function (records, operation, success) {
                if (!records[0]) {
                    f.down("[name=pt_id]").setValue(parseInt(apps.pt));                      
                } else {
                    f.down("[name=pt_id]").setValue(records[0]);
                }       
            }
        });
    },
    saveData: function() {
        
        var me = this;
        var f = me.getFormdata();

        var tipepajak_id = f.down("[name=tipepajakdetail_id]").getValue();
        var kelaskontraktor_id = f.down("[name=kelaskontraktor_id]").getValue();
        var tipekontraktor_id = f.down("[name=tipekontraktor_id]").getValue();
        var persentase = f.down("[name=persentase]").getValue();
        var project_id = f.down("[name=project_id]").getValue();
        var pt_id = f.down("[name=pt_id]").getValue();
        var is_npwp = f.down("[name=is_npwp]").getValue() == true ? 1 : 0;

        if (tipepajak_id == "" || tipepajak_id == 0 || tipepajak_id == null) {
            Ext.Msg.alert("Alert", "Tipe Pajak must be filled.");
            return false; 
        }

        if (persentase == "" || persentase == 0 || persentase == null) {
            Ext.Msg.alert("Alert", "Persentase must be filled.");
            return false; 
        }

        // VALIDASI 
        Ext.Ajax.request({
            url: 'cashier/persentasepajak/read',
            method: 'POST',
            params: {
                hideparam: 'checkdataexists',
                project_id: project_id,
                pt_id: pt_id,
                tipepajakdetail_id: tipepajak_id,
                is_npwp: is_npwp,
                tipekontraktor_id: tipekontraktor_id,
                kelaskontraktor_id: kelaskontraktor_id,
                persentase: persentase
            },
            success: function(response) {
                var o = Ext.JSON.decode(response.responseText);

                if (o.success == "false") {
                    Ext.Msg.alert("Alert", o.msg);
                    return false;
                } else {
                    Ext.Msg.confirm("Confirmation", "Are you sure?", function(btn) {
                        if (btn == 'yes') {
                            me.dataSave();
                        }
                    })
                }
            }
        })
    }
})