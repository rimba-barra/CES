Ext.define('Erems.controller.Popupjatuhtempoescrow', {
    extend: 'Erems.library.template.controller.Controllerpopup',
    alias: 'controller.Popupjatuhtempoescrow',
    views: ['popupjatuhtempoescrow.Panel', 'popupjatuhtempoescrow.Grid', 'popupjatuhtempoescrow.FormSearch'],
    requires: ['Erems.library.template.component.Plafoncombobox','Erems.library.template.component.Clustercombobox'],
    stores: ['', 'Popupjatuhtempoescrow', 'Mastercluster', 'Masterplafon'],
    models: ['Popupmaster'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupjatuhtempoescrowgrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupjatuhtempoescrowformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupjatuhtempoescrowformdata'
        }
    ],
    controllerName: 'popupjatuhtempoescrow',
    fieldName: '',
    bindPrefixName: 'Popupjatuhtempoescrow',
    init: function (application) {
        var me = this;
        this.control({
            'popupjatuhtempoescrowpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupjatuhtempoescrowgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupjatuhtempoescrowformsearch': {
                afterrender: this.formSearchAfterRender,
            },
            'popupjatuhtempoescrowgrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'popupjatuhtempoescrowgrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },
            'popupjatuhtempoescrowgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupjatuhtempoescrowgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupjatuhtempoescrowformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupjatuhtempoescrowformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupjatuhtempoescrowformdata': {
                afterrender: this.formDataAfterRender
            },
            'popupjatuhtempoescrowformdata button[action=save]': {
                click: this.dataSave
            },
            'popupjatuhtempoescrowformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'popupjatuhtempoescrowgrid toolbar button[action=export_excel]': {
                click: function (el) {
                    this.dataExport(el, 'jatuhtempoescrow', me.getFormsearch().getValues());
                }
            },
            'popupjatuhtempoescrowgrid toolbar button[action=print]': {
                click: function (el) {
                    me.processReport();
                }
            }
        });
    },
    processReport: function () {
        var me = this;
        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);

        if (win) {
            var params = [];

            params["project_id"] = apps.project;
            params["pt_id"] = apps.pt;

            var reportFile = 'Pinjampakailunas';

//          console.log(params);
            var html = me.generateFakeForm2(params, reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
});