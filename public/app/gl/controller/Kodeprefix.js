Ext.define('Gl.controller.Kodeprefix', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Kodeprefix',
    views: ['kodeprefix.Panel', 'kodeprefix.Grid', 'kodeprefix.FormSearch', 'kodeprefix.FormData'],
    stores: ['Kodeprefix'],
    models: ['Kodeprefix'],
    refs: [
        {
            ref: 'grid',
            selector: 'kodeprefixgrid'
        },
        {
            ref: 'formsearch',
            selector: 'kodeprefixformsearch'
        },
        {
            ref: 'formdata',
            selector: 'kodeprefixformdata'
        }
    ],
    controllerName: 'kodeprefix',
    fieldName: 'prefix',
    bindPrefixName:'Kodeprefix',
    init: function(application) {
        var me = this;
        this.control({
            'kodeprefixpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'kodeprefixgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'kodeprefixgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'kodeprefixgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'kodeprefixgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'kodeprefixgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'kodeprefixgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'kodeprefixformsearch button[action=search]': {
                click: this.dataSearch
            },
            'kodeprefixformsearch [name=prefix]': {
                 keyup: function () {
                    this.liveSearch(this);
                }
            },
            'kodeprefixformsearch [name=description]': {
                 keyup: function () {
                    this.liveSearch(this);
                }
            },
            'kodeprefixformsearch [name=is_cashflow]': {
                 change: function () {                     
                   this.liveSearch(this);
                }
            },
            'kodeprefixformsearch [name=is_cashier]': {
                 change: function () {                     
                   this.liveSearch(this);
                }
            },
            'kodeprefixformsearch [name=openmonth]': {
                 change: function () {                     
                   this.liveSearch(this);
                }
            },
            'kodeprefixformsearch button[action=reset]': {
                click:function (){
                    this.customeReset(this);                     
                }   
            },
            'kodeprefixformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function (panel) {
                    this.Fluidpanel(panel);
                },
            },
             'kodeprefixformdata [name=prefix]': {
                blur: function () {
                    this.dataExist('gl/kodeprefix/create', me, 'checkexist', 'prefix');
                },
                /*
                keyup : function (){
                    this.maskCOA(this, 'prefix', 'value');
                }
                */
            },
            'kodeprefixformdata button[action=save]': {
                click: this.dataSave
            },
            'kodeprefixformdata button[action=cancel]': {
                click: this.formDataClose
            }

        });
    }
});