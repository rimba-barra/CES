<?php

/**
 * Description of Helper
 *
 * @author MIS
 */
class Erems_Box_Models_App_Config_Helper {

    private $data;

    public function __construct($data) {

        $this->data = $data;
        foreach ($this->data as $k => $v) {
            $this->data[$k] = new Erems_Box_Models_App_Config_Object($v[0], $v[1]);
        }
    }

    public function get($name) {
        if (key_exists($name, $this->data)) {
            $d = $this->data[$name];
            if ($d instanceof Erems_Box_Models_App_Config_Object) {
                return $d;
            }
        }

        return FALSE;
    }

}

?>
