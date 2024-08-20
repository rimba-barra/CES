Ext.define('Erems.controller.Listdatacjp', {
    extend: 'Erems.library.template.controller.Controllermanual',
    alias: 'controller.Listdatacjp',
    requires: [
        'Erems.library.template.component.Statusaplikasicombobox',
        'Erems.library.template.component.Pricetypecombobox',
    ],
    views: [
        'listdatacjp.Panel',
        'listdatacjp.Grid',
        'listdatacjp.FormSearch',
        'listdatacjp.FormData',
    ],
    stores: [
        'Listdatacjp',
        'Statusaplikasi',
    ],
    models: [
        'Listdatacjp',
    ],
    refs: [
        {ref: 'grid', selector: 'listdatacjpgrid'},
        {ref: 'formsearch', selector: 'listdatacjpformsearch'},
        {ref: 'formdata', selector: 'listdatacjpformdata'},
    ],
    controllerName: 'listdatacjp',
    fieldName: 'listdatacjp',
    bindPrefixName: 'Listdatacjp',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'listdatacjppanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'listdatacjpgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'listdatacjpgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'listdatacjpgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'listdatacjpgrid toolbar button[action=export]': {
                click: function () {
                  this.Exportdata();
                }
            },
            'listdatacjpgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'listdatacjpgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'listdatacjpgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'listdatacjpformsearch button[action=search]': {
                click: this.dataSearch
            },
            'listdatacjpformsearch button[action=reset]': {
                click: this.dataReset
            },
            'listdatacjpformdata': {
                afterrender: this.formDataAfterRender
            },
            'listdatacjpformdata button[action=submit]': {
                click: this.DataSave
            },
            'listdatacjpformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    gridSelectionChange: function () {

    },
    Exportdata:function(){
        var me,form,value,grid;
        me =this;
        form = me.getFormsearch();
        grid = me.getGrid();
        value  = form.getForm().getValues();
        value['mode_read'] ='exportexcel';
        grid.up('window').mask('Export data, please wait ...');
        me.AjaxRequest(value);
    },
    AjaxRequest: function (param) {
        var me,info;
        me = this;
        Ext.Ajax.request({
            url: 'erems/listdatacjp/create',
            method: 'POST',
            params: {
                data: Ext.encode(param)
            },
            success: function (response) {
                info = Ext.JSON.decode(response.responseText);
                me.getGrid().up('window').unmask();
                window.open(info.msg,'_blank');
                //window.open(info.directdata,'_blank');
            },
            failure: function (response) {
                me.formDataClose();
            }
        });
    },

});