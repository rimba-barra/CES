Ext.define('Cashier.library.template.combobox.Coacomboboxgrid', {
    extend: 'Cashier.library.component.Combobox',
    requires: [
        'Ext.grid.Panel',
    ],
    alias: ['widget.coacomboboxgrid'],
    valueField: 'coa_id',
    displayField: 'coa',
    store: 'Coacombo',
    anchor: '100%',        
    listConfig: {
        columns: [
            {
                header: 'COA',
                dataIndex: 'coa',
            },
            {
                header: 'Name',
                dataIndex: 'name',
            }
        ]
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
                    width: 1000,
                    height: 200,
                    pickerField: this,
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


