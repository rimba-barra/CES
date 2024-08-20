Ext.define('Erems.controller.Popuplistpembatalan', {
    extend : 'Erems.library.template.controller.Controllerpopup',
    alias  : 'controller.Popuplistpembatalan',
    views  : ['popuplistpembatalan.Panel', 'popuplistpembatalan.Grid', 'popuplistpembatalan.FormSearch'],
    requires: ['Erems.library.template.component.Clustercombobox'],
    stores : ['', 'Popuplistpembatalan', 'Mastercluster'],
    models : ['Popupmaster'],
    refs   : [
        {
            ref      : 'grid',
            selector : 'popuplistpembatalangrid'
        },
        {
            ref      : 'formsearch',
            selector : 'popuplistpembatalanformsearch'
        },
        {
            ref      : 'formdata',
            selector : 'popuplistpembatalanformdata'
        }
    ],
    controllerName : 'popuplistpembatalan',
    fieldName      : '',
    bindPrefixName : 'Popuplistpembatalan',
    init           : function(application) {
        var me = this;
        this.control({
            'popuplistpembatalanpanel': {
                beforerender : me.mainPanelBeforeRender,
                afterrender  : this.panelAfterRender

            },
            'popuplistpembatalangrid': {
                afterrender     : this.gridAfterRender,
                itemdblclick    : this.gridItemDblClick,
                itemcontextmenu : this.gridItemContextMenu,
                selectionchange : this.gridSelectionChange
            },
            'popuplistpembatalanformsearch' : {
                afterrender : this.formSearchAfterRender,
            },
            'popuplistpembatalangrid toolbar button[action=create]': {
                click : function() {
                    this.formDataShow('create');
                }
            },
            'popuplistpembatalangrid toolbar button[action=update]': {
                click : function() {
                    this.formDataShow('update');
                }
            },
            'popuplistpembatalangrid toolbar button[action=destroy]': {
                click : this.dataDestroy
            },
            'popuplistpembatalangrid toolbar button[action=print]': {
                click : this.dataPrint
            },
            'popuplistpembatalangrid actioncolumn': {
                afterrender : this.gridActionColumnAfterRender,
                click       : this.gridActionColumnClick
            },
            'popuplistpembatalanformsearch button[action=search]': {
                click : this.dataSearch
            },
            'popuplistpembatalanformsearch button[action=reset]': {
                click : this.dataReset
            },
            'popuplistpembatalanformdata': {
                afterrender : this.formDataAfterRender
            },
            'popuplistpembatalanformdata button[action=save]': {
                click : this.dataSave
            },
            'popuplistpembatalanformdata button[action=cancel]': {
                click : this.formDataClose
            },
            'popuplistpembatalangrid toolbar button[action=export_excel]': {
                click: function(el) {
                    this.dataExport(el, 'listpembatalan', me.getFormsearch().getValues());
                }
            }
        });
    }
});