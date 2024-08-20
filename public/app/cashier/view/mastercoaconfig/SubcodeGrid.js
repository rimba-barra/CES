Ext.define('Cashier.view.mastercoaconfig.SubcodeGrid', {
    extend: 'Cashier.library.template.view.GridDS2Browse',
    alias: 'widget.subcodegrid',
    storeConfig: {
        id: 'IDselectedsubcode',
        idProperty: 'subgl_id',
        extraParams: {
            mode_read: 'subcodelist'
        }
    },
    id: 'browsesubcodeid',
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Mastercoaconfig',
    newButtonLabel: 'New Unit',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype: 'gridcolumn',
                width: 11
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
//               

                {
                    dataIndex: 'code',
                    text: 'Sub code',
                    width: 120
                },
                {
                    dataIndex: 'code1',
                    text: 'Code 1',
                    width: 100
                },
                {
                    dataIndex: 'code2',
                    text: 'Code 2',
                    width: 100
                },
                {
                    dataIndex: 'code3',
                    text: 'Code 3',
                    width: 100
                },
                {
                    dataIndex: 'code4',
                    text: 'Code 4',
                    width: 100
                },
                {
                    dataIndex: 'description',
                    text: 'Description',
                    width: 300
                },
//                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        id:'btnselectsub',
                        itemId:'btnselectsub',
//                        disabled: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-approve',
                        text: "Pick sub code "
                    }
                ]
            }
        ];
        return dockedItems;
    },
    getFormSearch: function () {


        var x = [
            {
                xtype: 'hiddenfield',
                id: 'projectVoucherIdSubcode',
                name: 'project_id'
            },
            {
                xtype: 'combobox',
                name: 'pt_id',
                fieldLabel: 'Company',
                displayField: 'name',
                valueField: 'pt_id',
                width: 250,
                allowBlank: false,
                readOnly: true,
                enforceMaxLength: true,
                dataBinder: 'pt',
                queryMode: 'local',
                matchFieldWidth: false,
                tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="500px">',
                        '<tr class="x-grid-row">',
                        '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                        '<th width="200px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                        '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                        '</tr>',
                        '<tpl for=".">',
                        '<tr class="x-boundlist-item">',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                        '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                        '</tr>',
                        '</tpl>',
                        '</table>'
                        ),
                absoluteReadOnly: true,
                enableKeyEvents: true,
                rowdata: null,
                forceSelection: false,
                typeAhead: false,
                id: 'ptVoucherIdSubcode',
                listeners: {
                    keyup: function (field) {
                        var searchString = field.getValue();
                        if (searchString) {
                            this.store.filterBy(function (record, id) {
                                if (record.get('name').toString().toLowerCase().indexOf(searchString) > -1) {
                                    return true;
                                    this.store.clearFilter(true);
                                } else if (record.get('code').toString().toLowerCase().indexOf(searchString) > -1) {
                                    return true;
                                    this.store.clearFilter(true);
                                } else {
                                    return false;
                                    this.store.clearFilter(true);
                                }
                            });
                        }
                    },
                    change: function (v) {
                        if (v.value) {
                            //console.log(v);
                        }
                    },
                    buffer: 300,
                },
            },
            {
                xtype: 'textfield',
                name: 'kelsub_kelsub_id',
                fieldLabel: ' Kelsub ',
                maxLength: 30,
                anchor: '-15',
                width: 100,
                readOnly:true,
                hidden:true,
                id: 'kelsubIdSubcode',
                itemId:'kelsubIdSubcode',
            },
            {
                xtype: 'textfield',
                name: 'code',
                fieldLabel: 'Sub Code. ',
                maxLength: 30,
                anchor: '-15',
                width: 100,
                listeners: {
                    afterrender: function (field) {
                        field.focus(false, 1000);
                    }
                }
            },
            {
                xtype: 'textfield',
                name: 'description',
                fieldLabel: 'Description ',
                width: 100,
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
            },
        ];
        return x;
    }
});