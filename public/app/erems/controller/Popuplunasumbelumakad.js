Ext.define('Erems.controller.Popuplunasumbelumakad', {
    extend : 'Erems.library.template.controller.Controllerpopup',
    alias  : 'controller.Popuplunasumbelumakad',
    views  : ['popuplunasumbelumakad.Panel', 'popuplunasumbelumakad.Grid', 'popuplunasumbelumakad.FormSearch'],
    requires: ['Erems.library.template.component.Clustercombobox'],
    stores : ['', 'Popuplunasumbelumakad', 'Mastercluster'],
    models : ['Popupmaster'],
    refs   : [
        {
            ref      : 'grid',
            selector : 'popuplunasumbelumakadgrid'
        },
        {
            ref      : 'formsearch',
            selector : 'popuplunasumbelumakadformsearch'
        },
        {
            ref      : 'formdata',
            selector : 'popuplunasumbelumakadformdata'
        }
    ],
    controllerName : 'popuplunasumbelumakad',
    fieldName      : '',
    bindPrefixName : 'Popuplunasumbelumakad',
    init           : function(application) {
        var me = this;
        this.control({
            'popuplunasumbelumakadpanel': {
                beforerender : me.mainPanelBeforeRender,
                afterrender  : this.panelAfterRender

            },
            'popuplunasumbelumakadgrid': {
                afterrender     : this.gridAfterRender,
                itemdblclick    : this.gridItemDblClick,
                itemcontextmenu : this.gridItemContextMenu,
                selectionchange : this.gridSelectionChange
            },
            'popuplunasumbelumakadformsearch' : {
                afterrender : this.formSearchAfterRender,
            },
            'popuplunasumbelumakadgrid toolbar button[action=create]': {
                click : function() {
                    this.formDataShow('create');
                }
            },
            'popuplunasumbelumakadgrid toolbar button[action=update]': {
                click : function() {
                    this.formDataShow('update');
                }
            },
            'popuplunasumbelumakadgrid toolbar button[action=destroy]': {
                click : this.dataDestroy
            },
            'popuplunasumbelumakadgrid toolbar button[action=print]': {
                click : this.dataPrint
            },
            'popuplunasumbelumakadgrid actioncolumn': {
                afterrender : this.gridActionColumnAfterRender,
                click       : this.gridActionColumnClick
            },
            'popuplunasumbelumakadformsearch button[action=search]': {
                click : this.dataSearch
            },
            'popuplunasumbelumakadformsearch button[action=reset]': {
                click : this.dataReset
            },
            'popuplunasumbelumakadformdata': {
                afterrender : this.formDataAfterRender
            },
            'popuplunasumbelumakadformdata button[action=save]': {
                click : this.dataSave
            },
            'popuplunasumbelumakadformdata button[action=cancel]': {
                click : this.formDataClose
            },
            'popuplunasumbelumakadgrid toolbar button[action=export_excel]': {
                click: function(el) {
                    this.dataExport(el, 'lunasumbelumakad', me.getFormsearch().getValues());
                }
            }
        });
    }
});