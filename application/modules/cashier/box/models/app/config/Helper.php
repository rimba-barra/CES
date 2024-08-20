<?php

/**
 * Description of Helper
 *
 * @author MIS
 */
class Cashier_Box_Models_App_Config_Helper {

    private $data;

    public function __construct($data) {

        $this->data = $data;
        foreach ($this->data as $k => $v) {
            $this->data[$k] = new Cashier_Box_Models_App_Config_Object($v[0], $v[1]);
        }
    }

    public function get($name) {
        if (key_exists($name, $this->data)) {
            $d = $this->data[$name];
            if ($d instanceof Cashier_Box_Models_App_Config_Object) {
                return $d;
            }
        }

        return FALSE;
    }

}

?>
