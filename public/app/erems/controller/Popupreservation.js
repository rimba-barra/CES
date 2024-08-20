Ext.define('Erems.controller.Popupreservation', {
    extend : 'Erems.library.template.controller.Controllerpopup',
    alias  : 'controller.Popupreservation',
    views  : ['popupreservation.Panel', 'popupreservation.Grid', 'popupreservation.FormSearch'],
    stores : ['', 'Popupreservation'],
    models : ['Popupmaster'],
    refs   : [
        {
            ref      : 'grid',
            selector : 'popupreservationgrid'
        },
        {
            ref      : 'formsearch',
            selector : 'popupreservationformsearch'
        },
        {
            ref      : 'formdata',
            selector : 'popupreservationformdata'
        }
    ],
    controllerName : 'popupreservation',
    fieldName      : '',
    bindPrefixName : 'Popupreservation',
    init           : function(application) {
        var me = this;
        this.control({
            'popupreservationpanel': {
                beforerender : me.mainPanelBeforeRender,
                afterrender  : this.panelAfterRender

            },
            'popupreservationgrid': {
                afterrender     : this.gridAfterRender,
                itemdblclick    : this.gridItemDblClick,
                itemcontextmenu : this.gridItemContextMenu,
                selectionchange : this.gridSelectionChange
            },
            'popupreservationformsearch' : {
                afterrender : this.formSearchAfterRender,
            },
            'popupreservationgrid toolbar button[action=create]': {
                click : function() {
                    this.formDataShow('create');
                }
            },
            'popupreservationgrid toolbar button[action=update]': {
                click : function() {
                    this.formDataShow('update');
                }
            },
            'popupreservationgrid toolbar button[action=destroy]': {
                click : this.dataDestroy
            },
            'popupreservationgrid toolbar button[action=print]': {
                click : this.dataPrint
            },
            'popupreservationgrid actioncolumn': {
                afterrender : this.gridActionColumnAfterRender,
                click       : this.gridActionColumnClick
            },
            'popupreservationformsearch button[action=search]': {
                click : this.dataSearch
            },
            'popupreservationformsearch button[action=reset]': {
                click : this.dataReset
            },
            'popupreservationformdata': {
                afterrender : this.formDataAfterRender
            },
            'popupreservationformdata button[action=save]': {
                click : this.dataSave
            },
            'popupreservationformdata button[action=cancel]': {
                click : this.formDataClose
            },
            'popupreservationgrid toolbar button[action=export_excel]': {
                click: function(el) {
                    this.dataExport(el, 'popupreservation', me.getFormsearch().getValues());
                }
            }
        });
    }
});