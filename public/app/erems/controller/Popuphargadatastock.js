Ext.define('Erems.controller.Popuphargadatastock', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popuphargadatastock',
	views: ['popuphargadatastock.Panel', 'popuphargadatastock.Grid', 'popuphargadatastock.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox','Erems.library.template.component.Typecombobox','Erems.library.template.component.Positioncombobox', 'Erems.library.template.component.Productcategorycombobox', 'Erems.library.template.component.Sidecombobox', 'Erems.library.template.component.Purposecombobox', 'Erems.library.template.component.Unitstatuscombobox'],
	stores: ['', 'Popuphargadatastock', 'Mastercluster', 'Masterblock', 'Mastertype', 'Masterposisi', 'Masterproductcategory', 'Masterside', 'Masterpurpose', 'Unitstatus'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popuphargadatastockgrid'
		},
		{
			ref: 'formsearch',
			selector: 'popuphargadatastockformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popuphargadatastockformdata'
		}
	],
	controllerName: 'popuphargadatastock',
	fieldName: '',
	bindPrefixName: 'Popuphargadatastock',
	init: function (application) {
		var me = this;
		this.control({
			'popuphargadatastockpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popuphargadatastockgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popuphargadatastockformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popuphargadatastockgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popuphargadatastockgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popuphargadatastockgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popuphargadatastockgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popuphargadatastockformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popuphargadatastockformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popuphargadatastockformdata': {
				afterrender: this.formDataAfterRender
			},
			'popuphargadatastockformdata button[action=save]': {
				click: this.dataSave
			},
			'popuphargadatastockformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popuphargadatastockgrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'hargadatastock', me.getFormsearch().getValues());
				}
			}
		});
	},
    
    formSearchAfterRender: function(el) {
        var me = this;
        me.loadComboBoxStore(el);
    },
    
    loadComboBoxStore: function(el) {
        var me = this;
        try {
            var itemForms = el.getForm().getFields().items;
            for (var x in itemForms) {
                /// make sure this component is combobox
                if (itemForms[x].getXTypes().indexOf("combobox") > -1) {
                    if (itemForms[x].getStore().storeId != "ext-empty-store") {
                        itemForms[x].getStore().proxy.extraParams = {start:0,limit:0};
                        itemForms[x].getStore().load();
                    }
                }

            }
        } catch (err) {
            console.log(err);
        }
    },
});