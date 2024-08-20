Ext.define('Erems.controller.Popupprintedlunasdp', {
    extend : 'Erems.library.template.controller.Controllerpopup',
    alias  : 'controller.Popupprintedlunasdp',
    views  : ['popupprintedlunasdp.Panel', 'popupprintedlunasdp.Grid', 'popupprintedlunasdp.FormSearch'],
    requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
    stores : ['', 'Popupprintedlunasdp', 'Mastercluster', 'Masterblock'],
    models : ['Popupmaster'],
    refs   : [
        {
            ref      : 'grid',
            selector : 'popupprintedlunasdpgrid'
        },
        {
            ref      : 'formsearch',
            selector : 'popupprintedlunasdpformsearch'
        },
        {
            ref      : 'formdata',
            selector : 'popupprintedlunasdpformdata'
        }
    ],
    controllerName : 'popupprintedlunasdp',
    fieldName      : '',
    bindPrefixName : 'Popupprintedlunasdp',
    init           : function(application) {
        var me = this;
        this.control({
            'popupprintedlunasdppanel': {
                beforerender : me.mainPanelBeforeRender,
                afterrender  : this.panelAfterRender

            },
            'popupprintedlunasdpgrid': {
                afterrender     : this.gridAfterRender,
                itemdblclick    : this.gridItemDblClick,
                itemcontextmenu : this.gridItemContextMenu,
                selectionchange : this.gridSelectionChange
            },
            'popupprintedlunasdpformsearch' : {
                afterrender : this.formSearchAfterRender,
            },
            'popupprintedlunasdpgrid toolbar button[action=create]': {
                click : function() {
                    this.formDataShow('create');
                }
            },
            'popupprintedlunasdpgrid toolbar button[action=update]': {
                click : function() {
                    this.formDataShow('update');
                }
            },
            'popupprintedlunasdpgrid toolbar button[action=destroy]': {
                click : this.dataDestroy
            },
            'popupprintedlunasdpgrid toolbar button[action=print]': {
                click : this.dataPrint
            },
            'popupprintedlunasdpgrid actioncolumn': {
                afterrender : this.gridActionColumnAfterRender,
                click       : this.gridActionColumnClick
            },
            'popupprintedlunasdpformsearch button[action=search]': {
                click : this.dataSearch
            },
            'popupprintedlunasdpformsearch button[action=reset]': {
                click : this.dataReset
            },
            'popupprintedlunasdpformdata': {
                afterrender : this.formDataAfterRender
            },
            'popupprintedlunasdpformdata button[action=save]': {
                click : this.dataSave
            },
            'popupprintedlunasdpformdata button[action=cancel]': {
                click : this.formDataClose
            },
            'popupprintedlunasdpgrid toolbar button[action=export_excel]': {
                click: function(el) {
                    this.dataExport(el, 'popupprintedlunasdp', me.getFormsearch().getValues());
                }
            }
        });
    }
});