Ext.define('Cashier.controller.Pajakprogresif', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Pajakprogresif',
    views: [
        'pajakprogresif.Panel',
        'pajakprogresif.Grid',
        'pajakprogresif.FormSearch',
        'pajakprogresif.FormData',
    ],
    stores: [
        'Pajakprogresif',
        'Project',
        'Pt',
        'Mastertipepajak',
        'Masterpajak'
    ],
    models: [
        'Pajakprogresif',
        'Project',
        'Pt',
        'Mastertipepajak',
        'Masterpajak'
    ],
    requires: [
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Mastertipepajakcombo',
        'Cashier.library.template.combobox.Masterpajakcombobox'
    ],
    refs: [
        {ref: 'grid', selector: 'pajakprogresifgrid'},
        {ref: 'formsearch', selector: 'pajakprogresifformsearch'},
        {ref: 'formdata', selector: 'pajakprogresifformdata'},
    ],
    controllerName: 'pajakprogresif',
    fieldName: 'pajakprogresif',
    bindPrefixName: 'Pajakprogresif',
    rowproject: null, storept: null, state: null,
    project_id: apps.project,
    pt_id: apps.pt,
    init: function (application) {
        var me = this;
        this.control({
            'pajakprogresifpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.formSearchAfterRenderCustom

            },
            'pajakprogresifgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'pajakprogresifformsearch': {
                afterrender: function() {
                    var me = this;
                    var f = me.getFormsearch();
                    var storedetail = f.down("[name=tipepajakdetail_id]").getStore();
                    f.down("[name=tipepajakdetail_id]").getStore().load();
                    f.down("[name=tipepajak_id]").getStore().load();
                    storedetail.on('load', function(){
                        storedetail.filterBy(function (record){
                            var tp = record.get('tipepajakdetail');
                            if (tp.includes("Progresif")){
                                return true;
                            }
                        });
                    });
                }
            },
            'pajakprogresifgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'pajakprogresifgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'pajakprogresifgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'pajakprogresifgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'pajakprogresifgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'pajakprogresifformsearch button[action=search]': {
                click: this.dataSearch
            },
            'pajakprogresifformsearch button[action=reset]': {
                click: this.dataReset
            },
            'pajakprogresifformdata': {
                afterrender: function(v) {
                    var me = this;
                    var f = me.getFormdata();

                    f.down("[name=project_id]").setReadOnly(true);
                    f.down("[name=pt_id]").setReadOnly(true);

                    this.loadProject(f);
                    var storedetail = f.down("[name=tipepajakdetail_id]").getStore();
                    storedetail.load();
                    storedetail.on('load', function(){
                        storedetail.filterBy(function (record){
                            var tp = record.get('tipepajakdetail');
                            if (tp.includes("Progresif")){
                                return true;
                            }
                        });
                    });
                    var state = v.up('window').state;
                    me.formDataAfterRender(f);
                    f.down("[name=project_id]").setValue(parseInt(me.project_id));
                    f.down("[name=pt_id]").setValue(parseInt(me.pt_id));

                }
            },
            'pajakprogresifformdata [name=pajakprogresif] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'pajakprogresifformdata [name=min_amount] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    var f = me.getFormdata();
                    var m =  accounting.unformat(f.down("[name=max_amount]").getValue());
                    var v =  accounting.unformat(f.down("[name=min_amount]").getValue());
                    var j = m-v;
                    j = accounting.format(j);
                    f.down("[name=factor_amount]").setValue(j);
                },
            },
            'pajakprogresifformdata [name=max_amount] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                    var f = me.getFormdata();
                    var m =  accounting.unformat(f.down("[name=max_amount]").getValue());
                    var v =  accounting.unformat(f.down("[name=min_amount]").getValue());
                    var j = m-v;
                    j = accounting.format(j);
                    f.down("[name=factor_amount]").setValue(j);
                },
            },
            'pajakprogresifformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'pajakprogresifformdata button[action=save]': {
                click: this.dataSave
            },
            'pajakprogresifformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    formSearchAfterRenderCustom: function() {
        var me;
        me = this;

        var f = me.getFormsearch();
        this.loadProject(f);  
        this.loadPtbyProject(me.project_id, f);    
        $("#WINDOW-mnu"+me.bindPrefixName+"-body .x-tool-collapse-left").click();
        
    },
    loadProject: function(f) {
        var me = this;
        var storeproject;
        storeproject = me.getStore('Project');
        storeproject.load({
            params: {
                "hideparam": 'projectpt',
                "project_id": me.project_id,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                        f.down("[name=project_id]").setValue(parseInt(me.project_id));                       
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
                    f.down("[name=pt_id]").setValue(parseInt(me.pt_id)); 
                } else {
                    f.down("[name=pt_id]").setValue(records[0]);
                }       
                me.dataSearch();  
            }
        });
    }
});