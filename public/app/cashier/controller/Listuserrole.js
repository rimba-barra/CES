Ext.define('Cashier.controller.Listuserrole', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptprojectcombobox',
        'Cashier.library.template.combobox.Projectcombobox'
    ],
    alias: 'controller.listuserrole',
    views: [
        'listuserrole.FormSearch',
        'listuserrole.Grid',
        'listuserrole.Panel'
    ],
    stores: [
        'Listuserrole',
        'Project',
        'Pt'
    ],
    models: [
        'Listuserrole',
        'Project',
        'Pt'
    ],
    refs: [
        { ref: 'grid', selector: 'listuserrolegrid' },
        { ref: 'formsearch', selector: 'listuserroleformsearch' },
        { ref: 'panel', selector: 'listuserrolepanel' }
    ],
    controllerName: 'listuserrole',
    fieldName: 'group_user_id',
    bindPrefixName: 'Listuserrole',
    formWidth: 500,
    win: null,
    winId: null,
    init: function(application) {
        var me = this;
        this.control({
            'listuserrolepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.formSearchAfterRenderCustom
            },
            'listuserrolegrid': {
                afterrender: me.gridAfterRender,
                itemdblclick: me.gridItemDblClick,
                itemcontextmenu: me.gridItemContextMenu,
                selectionchange: me.gridSelectionChange
            },
            'listuserrolegrid toolbar button[action=export]': {
                click: me.dataExport
            },
            'listuserroleformsearch [action=search]': {
                click: me.dataSearch
            },
            'listuserroleformsearch [action=reset]': {
                click: me.dataReset
            },
            'listuserroleformsearch [name=project_id]': {
                change: function(dis, newValue, oldValue, eOpts) {
                    var me = this;
                    var f = me.getFormsearch();
                    var project_id = dis.value; 
                    this.loadPtbyProject(project_id, f);
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
    dataExport: function() {

        var me = this;
        var fs = me.getFormsearch();
        var project_id = fs.down("[name=project_id]").getValue() == "" ? apps.project : fs.down("[name=project_id]").getValue();
        var pt_id = fs.down("[name=pt_id]").getValue() == "" ? apps.pt : fs.down("[name=pt_id]").getValue();

        Ext.getBody().mask("Please wait...");

        Ext.Ajax.request({
            url: 'cashier/listuserrole/read',
            method: 'POST',
            timeout:100000000,  
            params: {
                project_id: project_id,
                pt_id: pt_id,
                hideparam: 'exportdata'
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEventExport();
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setSuccessEventExport: function () {

        var me = this;
        Ext.getBody().unmask();
        var file_path = me.info.data.url;  
        var a = document.createElement('A');
        a.href = file_path;
        a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        Ext.getBody().unmask();
    }
})