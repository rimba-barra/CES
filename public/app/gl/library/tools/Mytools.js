Ext.define('Gl.library.tools.Mytools', //alamat dari file tersebut
        {
            constructor: function (options) {
                Ext.apply(this, options || {});
            },
            set_placeholder: function (controller, selector, value) {
                return controller.getFormdata().down("[name=" + selector + "]").setValue(value);
            },
            remove_placeholder: function (controller, selector, value) {
                var active = '';

                active = controller.getFormdata().down("[name=" + selector + "]").getValue();
                if (value == active) {
                    return controller.getFormdata().down("[name=" + selector + "]").setValue('');
                } else {
                    return active;
                }
            },
            get_elem_value: function (controller, name, type) {
                var result = '';
                if (type == 'value') {
                    result = controller.getFormdata().down("[name=" + name + "]").getValue();
                } else if (type == 'raw') {
                    result = controller.getFormdata().down("[name=" + name + "]").getRawValue();
                }
                return  result;
            },
            set_elem_value: function (controller, selector, name) {
                var code1, code2, code3, code4, result = '';
                code1 = this.check_exist(controller, 'code1');
                code2 = this.check_exist(controller, 'code2');
                code3 = this.check_exist(controller, 'code3');
                code4 = this.check_exist(controller, 'code4');

                result = this.generate_value(controller, code1, code2, code3, code4);

                controller.getFormdata().down("[name=" + name + "]").setValue(result);

            },
            check_exist: function (controller, selector) {
                var result = '';
                result = controller.getFormdata().down("[name=" + selector + "]").getValue();
                if (result) {
                    return 'exist'
                } else {
                    return 'empty'
                }
            },
            generate_value: function (controller, param1, param2, param3, param4) {
                var result, code1, code2, code3, code4 = '';

                code1 = controller.getFormdata().down("[name=code1]").getValue();
                code2 = controller.getFormdata().down("[name=code2]").getValue();
                code3 = controller.getFormdata().down("[name=code3]").getRawValue();
                code4 = controller.getFormdata().down("[name=code4]").getRawValue();

                if (param1 == 'empty' && param2 == 'empty' && param3 == 'empty' && param4 == 'empty') {
                    result = '';
                } else if (param1 == 'exist' && param2 == 'empty' && param3 == 'empty' && param4 == 'empty') {
                    result = code1;
                } else if (param1 == 'exist' && param2 == 'exist' && param3 == 'empty' && param4 == 'empty') {
                    result = code1 + ' ' + code2;
                } else if (param1 == 'exist' && param2 == 'exist' && param3 == 'exist' && param4 == 'empty') {
                    result = code1 + ' ' + code2 + code3;
                } else if (param1 == 'exist' && param2 == 'exist' && param3 == 'exist' && param4 == 'exist') {
                    result = code1 + ' ' + code2 + code3 + code4;
                } else if (param1 == 'empty' && param2 == 'exist' && param3 == 'empty' && param4 == 'empty') {
                    result = ' ' + code2;
                } else if (param1 == 'empty' && param2 == 'empty' && param3 == 'exist' && param4 == 'empty') {
                    result = ' ' + code3;
                } else if (param1 == 'empty' && param2 == 'empty' && param3 == 'empty' && param4 == 'exist') {
                    result = ' ' + code4;
                } else if (param1 == 'empty' && param2 == 'empty' && param3 == 'exist' && param4 == 'exist') {
                    result = ' ' + code3 + code4;
                } else if (param1 == 'empty' && param2 == 'exist' && param3 == 'exist' && param4 == 'empty') {
                    result = ' ' + code2 + code3;
                } else if (param1 == 'exist' && param2 == 'empty' && param3 == 'exist' && param4 == 'empty') {
                    result = code1 + ' ' + code3;
                } else if (param1 == 'exist' && param2 == 'exist' && param3 == 'empty' && param4 == 'exist') {
                    result = code1 + ' ' + code2 + code4;
                } else if (param1 == 'exist' && param2 == 'empty' && param3 == 'empty' && param4 == 'exist') {
                    result = code1 + ' ' + code4;
                } else if (param1 == 'empty' && param2 == 'exist' && param3 == 'exist' && param4 == 'exist') {
                    result = ' ' + code2 + code3 + code4;
                } else if (param1 == 'exist' && param2 == 'empty' && param3 == 'exist' && param4 == 'exist') {
                    result = code1 + ' ' + code3 + code4;
                }
                return result;
            },
            validationAccountType: function (debet, credit) {
                var status = '';
                if (debet == false && credit == false) {
                    status = 0;
                } else if (debet == true || credit == true) {
                    status = 1;
                }
                return status;
            },
            validationJournal: function (journal, nojournal) {
                var status = '';
                if (journal == false && nojournal == false) {
                    status = 0;
                } else if (journal == true || nojournal == true) {
                    status = 1;
                }
                return status;

            },
            validationReport: function (necara, profilloss) {
                var status = '';
                if (necara == false && profilloss == false) {
                    status = 0;
                } else if (necara == true || profilloss == true) {
                    status = 1;
                }
                return status;

            },
            bindingValidationCheckbox: function (statusaccounttype, datajournal, statusreport) {
                var status = '';
                if (statusaccounttype == 1 && datajournal == 1 && statusreport == 1) {
                    status = 1;
                } else {
                    status = 0;
                }
                return status;

            }
        });

