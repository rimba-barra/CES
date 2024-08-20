<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_UnitProcessor extends Erems_Models_App_Box_Processor {

    public function daoProses($dao, $object, $modeCreate) {

        switch ($modeCreate) {
            case "setupsheet":
                return $dao->setupShift($object);
                break;
        }
    }

    private function getNumberFromString($unitNumber) {
        $number = 0;
        $other = "";
        $hasil = array("number" => $number, "other" => $other, "is_usedelimiter" => FALSE);


        $delimiter = "/";

        $charPos = strpos($unitNumber, $delimiter);
        if (!$charPos) { // example unit number: A01
            $found = array();
            preg_match_all("/[0-9]/", $unitNumber, $found);
            if (count($found)) {
                $x = intval(implode("", $found[0]));
                $other = str_replace($x, "", $unitNumber);
                $hasil["number"] = $x;
                $hasil["other"] = $other;
            }
        } else { // example unit number : A01/01
            $numberBlok = explode($delimiter, $unitNumber);
            //var_dump($numberBlok);
            if (is_array($numberBlok)) {
                if (count($numberBlok) == 2) {
                    $hasil["number"] = intval($numberBlok[1]);
                    $hasil["other"] = $numberBlok[0];
                    $hasil["is_usedelimiter"] = $delimiter;
                }
            }
        }



        return $hasil;
    }

    /* /// Marking pada saat implementasi BMW Cilegon ( 2 Marett 2016 ) 

      private function getNumberFromString($unitNumber) {
      $number = 0;
      $other = "";
      $hasil = array("number" => $number, "other" => $other);
      $found = array();

      preg_match_all("/[0-9]/", $unitNumber, $found);

      if (count($found)) {
      $x = intval(implode("", $found[0]));
      $other = str_replace($x, "", $unitNumber);
      $hasil["number"] = $x;
      $hasil["other"] = $other;
      }
      return $hasil;
      }

     */

    private function createNumber($blok, $number, $delimiter = false) {
        if ($delimiter) {
            return $blok . "" . $delimiter . "" . Erems_Box_Tools::akda($number);
        }
        return $blok . "" . $number;
    }

    public function daoSave($dao, $object) {
        $header = new Erems_Models_Unit_Header();
        if ($object instanceof Erems_Models_Unit_UnitTran) {
            $data = $this->getData();
            $arUnit = array(); // unit list yang akan dibuat
            // check jika buat 1 atau lebih
            $unitNumber = $object->getNumber();
            $isLebihSatu = (boolean) $data["number_check"];
            $endNumber = $data["number_end"];
            $hasil = $this->getNumberFromString($unitNumber);
            $arNumber = array();
            if ($isLebihSatu && strlen($endNumber) > 0) { // jika lebih dari status
                $mode = $data["mode_number_generator"]; // ganjil,genap,semua
                $number = $hasil["number"];
                $hasil2 = $this->getNumberFromString($endNumber);



                $number2 = $hasil2["number"];



                for ($i = $number; $i <= $number2; $i++) {
                    if ($mode == "GANJIL" && $i % 2 != 0) {
                        //$arNumber[] = $hasil["other"] . "" . $i;
                        $arNumber[] = $this->createNumber($hasil["other"], $i, $hasil["is_usedelimiter"]);
                    } else if ($mode == "GENAP" && $i % 2 == 0) {
                        // $arNumber[] = $hasil["other"] . "" . $i;
                        $arNumber[] = $this->createNumber($hasil["other"], $i, $hasil["is_usedelimiter"]);
                    } else if ($mode == "SEMUA") {
                        // $arNumber[] = $hasil["other"] . "" . $i;
                        $arNumber[] = $this->createNumber($hasil["other"], $i, $hasil["is_usedelimiter"]);
                    }
                }
            } else {
                $arNumber[] = $unitNumber;
            }
            $unitNumber = NULL;

            $allUnit = array();



            /// create all unit
            foreach ($arNumber as $unitNumber) {
                $unit = new Erems_Models_Unit_UnitTran();
                $unit->setArrayTable($object->getArrayTable());
                $unit->setNumber($unitNumber);
                $header->addDetail($unit);
            }

            $de = new Erems_Box_Delien_DelimiterEnhancer();
            $de->setDelimiterCandidate($header);
            $de->generate();
        }

        $object->setProject($this->getSession()->getProject());
        $object->getStatus()->setId(Erems_Box_Config::UNITSTATUS_AVAILABLE);

        //var_dump($data);
        return $dao->save($object, $header);
    }

    public function daoUpdate($dao, $object) {
        $params = $this->getData();
        $unitHistory = new Erems_Models_Unit_UnitHistory();
        $unitHistory->setInstruksiOrder($params["unithistory_instruksi_order"]);
        $unitHistory->setPersonInCharge($params["unithistory_person_in_charge"]);
        $unitHistory->setDescription($params["unithistory_description"]);
        $object->setUnitHistory($unitHistory);
        return $dao->update($object);
    }

    public function createMultiNumber($data,$unitNumber) {
        $isLebihSatu = (boolean) $data["number_check"];
        $endNumber = $data["number_end"];
        $hasil = $this->getNumberFromString($unitNumber);
        $arNumber = array();
        if ($isLebihSatu && strlen($endNumber) > 0) { // jika lebih dari status
            $mode = $data["mode_number_generator"]; // ganjil,genap,semua
            $number = $hasil["number"];
            $hasil2 = $this->getNumberFromString($endNumber);



            $number2 = $hasil2["number"];



            for ($i = $number; $i <= $number2; $i++) {
                if ($mode == "GANJIL" && $i % 2 != 0) {
                    //$arNumber[] = $hasil["other"] . "" . $i;
                    $arNumber[] = $this->createNumber($hasil["other"], $i, $hasil["is_usedelimiter"]);
                } else if ($mode == "GENAP" && $i % 2 == 0) {
                    // $arNumber[] = $hasil["other"] . "" . $i;
                    $arNumber[] = $this->createNumber($hasil["other"], $i, $hasil["is_usedelimiter"]);
                } else if ($mode == "SEMUA") {
                    // $arNumber[] = $hasil["other"] . "" . $i;
                    $arNumber[] = $this->createNumber($hasil["other"], $i, $hasil["is_usedelimiter"]);
                }
            }
        } else {
            $arNumber[] = $unitNumber;
        }
        return $arNumber;
    }

}

?>
