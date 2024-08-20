Ext.define('Erems.controller.Popuplistbelumkomisi', {
    extend : 'Erems.library.template.controller.Controllerpopup',
    alias  : 'controller.Popuplistbelumkomisi',
    views  : ['popuplistbelumkomisi.Panel', 'popuplistbelumkomisi.Grid', 'popuplistbelumkomisi.FormSearch'],
    requires: ['Erems.library.template.component.Clustercombobox'],
    stores : ['', 'Popuplistbelumkomisi', 'Mastercluster'],
    models : ['Popupmaster'],
    refs   : [
        {
            ref      : 'grid',
            selector : 'popuplistbelumkomisigrid'
        },
        {
            ref      : 'formsearch',
            selector : 'popuplistbelumkomisiformsearch'
        },
        {
            ref      : 'formdata',
            selector : 'popuplistbelumkomisiformdata'
        }
    ],
    controllerName : 'popuplistbelumkomisi',
    fieldName      : '',
    bindPrefixName : 'Popuplistbelumkomisi',
    init           : function(application) {
        var me = this;
        this.control({
            'popuplistbelumkomisipanel': {
                beforerender : me.mainPanelBeforeRender,
                afterrender  : this.panelAfterRender

            },
            'popuplistbelumkomisigrid': {
                afterrender     : this.gridAfterRender,
                itemdblclick    : this.gridItemDblClick,
                itemcontextmenu : this.gridItemContextMenu,
                selectionchange : this.gridSelectionChange
            },
            'popuplistbelumkomisiformsearch' : {
                afterrender : this.formSearchAfterRender,
            },
            'popuplistbelumkomisigrid toolbar button[action=create]': {
                click : function() {
                    this.formDataShow('create');
                }
            },
            'popuplistbelumkomisigrid toolbar button[action=update]': {
                click : function() {
                    this.formDataShow('update');
                }
            },
            'popuplistbelumkomisigrid toolbar button[action=destroy]': {
                click : this.dataDestroy
            },
            'popuplistbelumkomisigrid toolbar button[action=print]': {
                click : this.dataPrint
            },
            'popuplistbelumkomisigrid actioncolumn': {
                afterrender : this.gridActionColumnAfterRender,
                click       : this.gridActionColumnClick
            },
            'popuplistbelumkomisiformsearch button[action=search]': {
                click : this.dataSearch
            },
            'popuplistbelumkomisiformsearch button[action=reset]': {
                click : this.dataReset
            },
            'popuplistbelumkomisiformdata': {
                afterrender : this.formDataAfterRender
            },
            'popuplistbelumkomisiformdata button[action=save]': {
                click : this.dataSave
            },
            'popuplistbelumkomisiformdata button[action=cancel]': {
                click : this.formDataClose
            },
            'popuplistbelumkomisigrid toolbar button[action=export_excel]': {
                click: function(el) {
                    this.dataExport(el, 'listbelumkomisi', me.getFormsearch().getValues());
                }
            }
        });
    }
});