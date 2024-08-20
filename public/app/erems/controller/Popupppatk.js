Ext.define('Erems.controller.Popupppatk', {
    extend : 'Erems.library.template.controller.Controllerpopup',
    alias  : 'controller.Popupppatk',
    views  : ['popupppatk.Panel', 'popupppatk.Grid', 'popupppatk.FormSearch'],
    requires: ['Erems.library.template.component.Clustercombobox'],
    stores : ['', 'Popupppatk', 'Mastercluster'],
    models : ['Popupmaster'],
    refs   : [
        {
            ref      : 'grid',
            selector : 'popupppatkgrid'
        },
        {
            ref      : 'formsearch',
            selector : 'popupppatkformsearch'
        },
        {
            ref      : 'formdata',
            selector : 'popupppatkformdata'
        }
    ],
    controllerName : 'popupppatk',
    fieldName      : '',
    bindPrefixName : 'Popupppatk',
    init           : function(application) {
        var me = this;
        this.control({
            'popupppatkpanel': {
                beforerender : me.mainPanelBeforeRender,
                afterrender  : this.panelAfterRender

            },
            'popupppatkgrid': {
                afterrender     : this.gridAfterRender,
                itemdblclick    : this.gridItemDblClick,
                itemcontextmenu : this.gridItemContextMenu,
                selectionchange : this.gridSelectionChange
            },
            'popupppatkformsearch' : {
                afterrender : this.formSearchAfterRender,
            },
            'popupppatkgrid toolbar button[action=create]': {
                click : function() {
                    this.formDataShow('create');
                }
            },
            'popupppatkgrid toolbar button[action=update]': {
                click : function() {
                    this.formDataShow('update');
                }
            },
            'popupppatkgrid toolbar button[action=destroy]': {
                click : this.dataDestroy
            },
            'popupppatkgrid toolbar button[action=print]': {
                click : this.dataPrint
            },
            'popupppatkgrid actioncolumn': {
                afterrender : this.gridActionColumnAfterRender,
                click       : this.gridActionColumnClick
            },
            'popupppatkformsearch button[action=search]': {
                click : this.dataSearch
            },
            'popupppatkformsearch button[action=reset]': {
                click : this.dataReset
            },
            'popupppatkformdata': {
                afterrender : this.formDataAfterRender
            },
            'popupppatkformdata button[action=save]': {
                click : this.dataSave
            },
            'popupppatkformdata button[action=cancel]': {
                click : this.formDataClose
            },
            'popupppatkgrid toolbar button[action=export_excel]': {
                click: function(el) {
                    this.dataExport(el, 'popupppatk', me.getFormsearch().getValues());
                }
            }
        });
    }
});