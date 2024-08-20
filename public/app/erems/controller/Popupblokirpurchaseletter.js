Ext.define('Erems.controller.Popupblokirpurchaseletter', {
    extend : 'Erems.library.template.controller.Controllerpopup',
    alias  : 'controller.Popupblokirpurchaseletter',
    views  : ['popupblokirpurchaseletter.Panel', 'popupblokirpurchaseletter.Grid', 'popupblokirpurchaseletter.FormSearch'],
    requires: ['Erems.library.template.component.Clustercombobox'],
    stores : ['', 'Popupblokirpurchaseletter', 'Mastercluster'],
    models : ['Popupmaster'],
    refs   : [
        {
            ref      : 'grid',
            selector : 'popupblokirpurchaselettergrid'
        },
        {
            ref      : 'formsearch',
            selector : 'popupblokirpurchaseletterformsearch'
        },
        {
            ref      : 'formdata',
            selector : 'popupblokirpurchaseletterformdata'
        }
    ],
    controllerName : 'popupblokirpurchaseletter',
    fieldName      : '',
    bindPrefixName : 'Popupblokirpurchaseletter',
    init           : function(application) {
        var me = this;
        this.control({
            'popupblokirpurchaseletterpanel': {
                beforerender : me.mainPanelBeforeRender,
                afterrender  : this.panelAfterRender

            },
            'popupblokirpurchaselettergrid': {
                afterrender     : this.gridAfterRender,
                itemdblclick    : this.gridItemDblClick,
                itemcontextmenu : this.gridItemContextMenu,
                selectionchange : this.gridSelectionChange
            },
            'popupblokirpurchaseletterformsearch' : {
                afterrender : this.formSearchAfterRender,
            },
            'popupblokirpurchaselettergrid toolbar button[action=create]': {
                click : function() {
                    this.formDataShow('create');
                }
            },
            'popupblokirpurchaselettergrid toolbar button[action=update]': {
                click : function() {
                    this.formDataShow('update');
                }
            },
            'popupblokirpurchaselettergrid toolbar button[action=destroy]': {
                click : this.dataDestroy
            },
            'popupblokirpurchaselettergrid toolbar button[action=print]': {
                click : this.dataPrint
            },
            'popupblokirpurchaselettergrid actioncolumn': {
                afterrender : this.gridActionColumnAfterRender,
                click       : this.gridActionColumnClick
            },
            'popupblokirpurchaseletterformsearch button[action=search]': {
                click : this.dataSearch
            },
            'popupblokirpurchaseletterformsearch button[action=reset]': {
                click : this.dataReset
            },
            'popupblokirpurchaseletterformdata': {
                afterrender : this.formDataAfterRender
            },
            'popupblokirpurchaseletterformdata button[action=save]': {
                click : this.dataSave
            },
            'popupblokirpurchaseletterformdata button[action=cancel]': {
                click : this.formDataClose
            },
            'popupblokirpurchaselettergrid toolbar button[action=export_excel]': {
                click: function(el) {
                    this.dataExport(el, 'blokirpurchaseletter', me.getFormsearch().getValues());
                }
            }
        });
    }
});