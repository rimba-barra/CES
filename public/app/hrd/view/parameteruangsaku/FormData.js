Ext.define('Hrd.view.parameteruangsaku.FormData', {
    alias: 'widget.parameteruangsakuformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'parameteruangsaku_id'
                },
                {
                    xtype: 'combobox',
                    name: 'group_group_id',
                    fieldLabel: 'Golongan',
                    displayField: cbf.group.d,
                    valueField: cbf.group.v,
                },
               
                {
                    name:'pulk_makan_satu_bulan',
                    fieldLabel:'Uang Makan PULK 1 Bulan',
                   // width:500
                },
                {
                    name:'pulk_saku_satu_bulan',
                    fieldLabel:'Uang Saku PULK 1 Bulan',
                   // width:500
                },
                {
                    name:'pulk_makan_satu_bulan_lebih',
                    fieldLabel:'Uang Makan PULK  > 1 Bulan',
                    //width:500
                },
                {
                    name:'pulk_saku_satu_bulan_lebih',
                    fieldLabel:'Uang Saku PULK > 1 Bulan',
                  //  width:500
                },
                {
                    name:'pplk_makan_satu_bulan',
                    fieldLabel:'Uang Makan PPLK 1 Bulan',
                   // width:500
                },
                {
                    name:'pplk_saku_satu_bulan',
                    fieldLabel:'Uang Saku PPLK 1 Bulan',
                   // width:500
                },
                {
                    name:'pplk_makan_satu_bulan_lebih',
                    fieldLabel:'Uang Makan PPLK  > 1 Bulan',
                   // width:500
                },
                {
                    name:'pplk_saku_satu_bulan_lebih',
                    fieldLabel:'Uang Saku PPLK > 1 Bulan',
                  //  width:500
                }
                

            ],
            dockedItems: [],
            tbar: [
                {
                    padding: '4px 6px',
                    xtype: 'button',
                    disabled:true,
                     action: 'save',
                    cls: 'InfoButton',
                    text: 'Save',
                    iconAlign: 'left',
                    iconCls: 'icon-save'
                },
                '->'
                
            ]
        });

        me.callParent(arguments);
    }
   
});