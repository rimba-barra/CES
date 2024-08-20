Ext.define('Appsmgmt.view.application.GroupFormData', {
  extend: 'Ext.form.Panel',
  alias: 'widget.GroupFormData',
  itemId: 'Group',
  frame: true,
  autoScroll: true,
  bodyBorder: true,
  bodyPadding: 10,
  bodyStyle: 'border-top:none;border-left:none;border-right:none;',
  initComponent: function () {
    var me = this;
    Ext.applyIf(me, {
      defaults: {
        labelSeparator: ' ',
        labelClsExtra: 'small',
        anchor: '100%'
      },
      items: [{
        xtype: 'hiddenfield',
        itemId: 'group_id',
        name: 'group_id',
        hidden: true
      },
      {
		xtype: 'hiddenfield',
		itemId: 'apps_id',
		name: 'apps_id',
	},
	{
		xtype: 'textfield',
		fieldLabel: 'Application',
		itemId: 'apps_name',
		name: 'apps_name',
		readOnly: true
	},
      {
        xtype: 'textfield',
        fieldLabel: 'Group Name',
        itemId: 'group_name',
        name: 'group_name',
        allowBlank: false,
        enforceMaxLength: true,
        maxLength: 50,
        maskRe: /[A-Za-z0-9\s]/,
        validator: function (val) {
          return (Ext.String.trim(val) != '' ? true : 'Blank Group Name')
        }
      },
      {
        xtype: 'textarea',
        fieldLabel: 'Description',
        itemId: 'description',
        name: 'description',
        height: 50,
        enforceMaxLength: true,
        maxLength: 255,
        maskRe: /[^\`\"\']/
      },
      {
        xtype: 'checkboxfield',
        fieldLabel: ' ',
        itemId: 'active',
        margin: '20 0 0 0',
        name: 'active',
        boxLabel: 'Active',
        boxLabelCls: 'x-form-cb-label small',
        inputValue: '1',
        uncheckedValue: '0'
      }],
      dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        layout: {
          padding: 6,
          type: 'hbox'
        },
        items: [{
          xtype: 'button',
          action: 'save',
          itemId: 'btnSave',
          padding: 5,
          width: 75,
          iconCls: 'icon-save',
          text: 'Save'
        },
        {
          xtype: 'button',
          action: 'cancel',
          itemId: 'btnCancel',
          padding: 5,
          width: 75,
          iconCls: 'icon-cancel',
          text: 'Cancel'
        }]
      }]
    });
    me.callParent(arguments)
  }
});