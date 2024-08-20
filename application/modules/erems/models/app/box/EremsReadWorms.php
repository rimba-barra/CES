<?php

/**
 * Description of HrdReadWorms
 *
 * @author MIS
 */
class Erems_Models_App_Box_EremsReadWorms extends Erems_Box_Models_App_Models_ReadWorms {

    public function __construct($controller, $debug = '') {
        parent::__construct($controller, $debug);
    }

    public function prosesObjects($name, $dataDao) {
        $x = array();
        $count = 0;
        foreach ($dataDao as $object) {

            if (is_array($object)) {
                if (count($object) > 0) {
                    if ($object[0] instanceof Erems_Box_Models_ObjectEmbedData) {
                        $prefix = $this->getCleanPrefix($object[0]);
                        $x[$prefix] = array("data" => null, "model" => null);


                        $x[$prefix]["data"] = array();
                        $x[$prefix]["model"] = $this->getFilledModel($object[0], $prefix);
                        foreach ($object as $row) {
                            if ($row->getId() != 0) {
                                $x[$prefix]["data"][] = $row->getArrayTable();
                            }
                        }
                    } else {
                        $otherKey = "others";
                        if (!array_key_exists($otherKey, $x)) {
                            $x[$otherKey] = array();
                        }
                        $x[$otherKey][] = $object;
                    }
                }

                /// get embedprefix from first record
            } else {
                if ($object instanceof Erems_Box_Models_ObjectEmbedData) {
                    $prefix = $this->getCleanPrefix($object);
                    $x[$prefix] = array("data" => null, "model" => null);

                    $x[$prefix]["data"] = $object->getArrayTable();
                    $x[$prefix]["model"] = $this->getFilledModel($object, $prefix);
                }
            }
            $count++;
        }



        $this->hasil->setData($x);
    }

    private function getCleanPrefix(Erems_Box_Models_ObjectEmbedData $object) {
        $prefix = str_replace("_", "", $object->getEmbedPrefix());
        return $prefix;
    }

    private function getFilledModel(Erems_Box_Models_ObjectEmbedData $object, $prefix) {
        $modelAr = array();
        foreach ($object->getArrayTable() as $field => $value) {
            $modelAr[] = array("mapping" => $prefix . "." . $field, "name" => $field);
        }
        return $modelAr;
    }

}

?>
