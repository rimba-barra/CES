Ext.define('Cashier.library.template.combobox.Subaccountgroupcomboboxgrid', {
    extend: 'Cashier.library.component.Combobox',
    requires: [
        'Ext.grid.Panel',
    ],
    alias: 'widget.subaccountgroupcomboboxgrid',
    store: 'Subaccountgroup', //masuk dalam store
    fieldLabel: 'Subaccountgroup',
    displayField: 'kelsub', //mengambil data dari store
    valueField: 'kelsub_id', //mengambil data dari store
    queryMode: 'local',
    listConfig: {
        columns: [
            {
                header: 'Sub Acc Group',
                dataIndex: 'kelsub',
                width: '120',
            },
            {
                header: 'Description',
                dataIndex: 'description',
                width: '200',
            }
        ],
    },
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    },
    // copied from ComboBox 
    createPicker: function () {
        var me = this,
                picker,
                menuCls = Ext.baseCSSPrefix + 'menu',
                opts = Ext.apply({
                    selModel: {
                        mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
                    },
                    floating: true,
                    hidden: true,
                    ownerCt: me.ownerCt,
                    cls: me.el.up('.' + menuCls) ? menuCls : '',
                    store: me.store,
                    displayField: me.displayField,
                    focusOnToFront: false,
                    pageSize: me.pageSize
                }, me.listConfig, me.defaultListConfig);

        // NOTE: we simply use a grid panel
        //picker = me.picker = Ext.create('Ext.view.BoundList', opts);
        picker = me.picker = Ext.create('Ext.grid.Panel', opts);

        // hack: pass getNode() to the view
        picker.getNode = function () {
            picker.getView().getNode(arguments);
        };

        me.mon(picker, {
            itemclick: me.onItemClick,
            refresh: me.onListRefresh,
            scope: me
        });

        me.mon(picker.getSelectionModel(), {
            selectionChange: me.onListSelectionChange,
            scope: me
        });

        return picker;
    }
});



