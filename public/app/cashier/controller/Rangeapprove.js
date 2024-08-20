Ext.define('Cashier.controller.Rangeapprove', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Rangeapprove',
    views: [
        'rangeapprove.Panel',
        'rangeapprove.Grid',
        'rangeapprove.FormSearch',
        'rangeapprove.FormData',
    ],
    stores: [
        'Rangeapprove','Ptbyusermulti'
    ],
    models: [
        'Rangeapprove','Projectpt'
    ],
    refs: [
        {ref: 'grid', selector: 'rangeapprovegrid'},
        {ref: 'formsearch', selector: 'rangeapproveformsearch'},
        {ref: 'formdata', selector: 'rangeapproveformdata'},
    ],
    controllerName: 'rangeapprove',
    fieldName: 'range',
    bindPrefixName: 'Rangeapprove',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'rangeapprovepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'rangeapprovegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'rangeapprovegrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'rangeapprovegrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'rangeapprovegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'rangeapprovegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'rangeapprovegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'rangeapproveformsearch button[action=search]': {
                click: this.dataSearch
            },
            'rangeapproveformsearch button[action=reset]': {
                click: this.dataReset
            },
            'rangeapproveformdata': {
                afterrender: this.formDataAfterRender
            },
            'rangeapproveformdata [name=rangeapprove] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'rangeapproveformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'rangeapproveformdata button[action=save]': {
                click: this.dataSave
            },
            'rangeapproveformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    panelAfterRender: function () {
        var me = this;
        var f = me.getFormsearch();
        var projectpt_id = 0;
        me.getFormsearch().down("[name=projectpt_id]").getStore().load();
        
        Ext.Ajax.request({
            url: 'cashier/common/read',
            method: 'POST',
            timeout:100000000,	
            params: {
                hideparam :'getptbyuserid',
                project_project_id: apps.project,
                pt_pt_id: apps.pt,
                user_id: apps.uid,
                start: 0,
                limit: 1000,
            },
            success: function (response) {
                response = Ext.JSON.decode(response.responseText);
                //console.log(response.data[0]['projectpt_id']);
                projectpt_id = response.data[0]['projectpt_id'];
                f.down("[name=projectpt_id]").setValue(parseInt(projectpt_id));
                me.dataSearch();
                var grid = me.getGrid();
                grid.setLoading('Please wait');
                var storear = grid.getStore();
                storear.load({
                    callback: function () {
                        grid.setLoading(false);
                    }
                });
            },
            failure: function (response) {
                
            }
        });
        console.log(projectpt_id);
        
    },
});