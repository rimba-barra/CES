Ext.define('Erems.controller.Popuplunasum', {
    extend : 'Erems.library.template.controller.Controllerpopup',
    alias  : 'controller.Popuplunasum',
    views  : ['popuplunasum.Panel', 'popuplunasum.Grid', 'popuplunasum.FormSearch'],
    requires: ['Erems.library.template.component.Clustercombobox'],
    stores : ['', 'Popuplunasum', 'Mastercluster'],
    models : ['Popupmaster'],
    refs   : [
        {
            ref      : 'grid',
            selector : 'popuplunasumgrid'
        },
        {
            ref      : 'formsearch',
            selector : 'popuplunasumformsearch'
        },
        {
            ref      : 'formdata',
            selector : 'popuplunasumformdata'
        }
    ],
    controllerName : 'popuplunasum',
    fieldName      : '',
    bindPrefixName : 'Popuplunasum',
    init           : function(application) {
        var me = this;
        this.control({
            'popuplunasumpanel': {
                beforerender : me.mainPanelBeforeRender,
                afterrender  : this.panelAfterRender

            },
            'popuplunasumgrid': {
                afterrender     : this.gridAfterRender,
                itemdblclick    : this.gridItemDblClick,
                itemcontextmenu : this.gridItemContextMenu,
                selectionchange : this.gridSelectionChange
            },
            'popuplunasumformsearch' : {
                afterrender : this.formSearchAfterRender,
            },
            'popuplunasumgrid toolbar button[action=create]': {
                click : function() {
                    this.formDataShow('create');
                }
            },
            'popuplunasumgrid toolbar button[action=update]': {
                click : function() {
                    this.formDataShow('update');
                }
            },
            'popuplunasumgrid toolbar button[action=destroy]': {
                click : this.dataDestroy
            },
            'popuplunasumgrid toolbar button[action=print]': {
                click : this.dataPrint
            },
            'popuplunasumgrid actioncolumn': {
                afterrender : this.gridActionColumnAfterRender,
                click       : this.gridActionColumnClick
            },
            'popuplunasumformsearch button[action=search]': {
                click : this.dataSearch
            },
            'popuplunasumformsearch button[action=reset]': {
                click : this.dataReset
            },
            'popuplunasumformdata': {
                afterrender : this.formDataAfterRender
            },
            'popuplunasumformdata button[action=save]': {
                click : this.dataSave
            },
            'popuplunasumformdata button[action=cancel]': {
                click : this.formDataClose
            },
            'popuplunasumgrid toolbar button[action=export_excel]': {
                click: function(el) {
                    this.dataExport(el, 'lunasum', me.getFormsearch().getValues());
                }
            }
        });
    }
});