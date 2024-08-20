
Ext.define('Erems.library.template.view.GridDS2Browse', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.templateviewgridds2browse',
    requires: ['Erems.template.ComboBoxFields'],
    region: 'center',
    getFormSearch: function() {

        var cbf = new Erems.template.ComboBoxFields();

        var x = [
            {
                xtype: 'textfield',
                name: 'unit_number',
                fieldLabel: 'Unit number',
                enforceMaxLength: true,
                maskRe: /[^\`\"\']/,
                maxLength: 30,
                anchor: '-170'
            },
            {
                xtype: 'combobox',
                name: 'block_id',
                displayField: cbf.block.d,
                fieldLabel: 'Block',
                valueField: cbf.block.v,
                dataBinder:'block',
                anchor: '-15'

            }
        ];
        return x;
    }
});