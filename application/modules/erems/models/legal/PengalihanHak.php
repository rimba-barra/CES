<?php

/**
 * Description of PengalihanHak
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Legal_PengalihanHak extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora {

    private $purchaseletter_id;
    private $changeownership_no;
    private $changeownershipreason_id;
    private $description;
    private $changeownership_date;
    private $biaya;
    private $ktp;
    private $name;
    private $address;
    private $telephone;
    private $mobilephone;
    private $city_id;

    private $city;
    private $email;
    private $fax;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "pengalihanhak_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x["changeownership_id"])) {
            $this->setId($x["changeownership_id"]);
        }
        if (isset($x["purchaseletter_id"])) {
            $this->setPurchaseletter_id($x["purchaseletter_id"]);
        }
        if (isset($x["changeownership_no"])) {
            $this->setChangeownership_no($x["changeownership_no"]);
        }
        if (isset($x["changeownershipreason_id"])) {
            $this->setChangeownershipreason_id($x["changeownershipreason_id"]);
        }
        if (isset($x["description"])) {
            $this->setDescription($x["description"]);
        }
        if (isset($x["changeownership_date"])) {
            $this->setChangeownership_date($x["changeownership_date"]);
        }
        if (isset($x["biaya"])) {
            $this->setBiaya($x["biaya"]);
        }
        if (isset($x["ktp"])) {
            $this->setKtp($x["ktp"]);
        }
        if (isset($x["name"])) {
            $this->setName($x["name"]);
        }
        if (isset($x["address"])) {
            $this->setAddress($x["address"]);
        }
        if (isset($x["telephone"])) {
            $this->setTelephone($x["telephone"]);
        }
        if (isset($x["mobilephone"])) {
            $this->setMobilephone($x["mobilephone"]);
        }
        if (isset($x["city_id"])) {
            $this->setCity_id($x["city_id"]);
        }

        if (isset($x["city"])) {
            $this->setCity($x["city"]);
        }
        if (isset($x["email"])) {
            $this->setEmail($x["email"]);
        }
        if (isset($x["fax"])) {
            $this->setFax($x["fax"]);
        }


        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            "changeownership_id" => $this->getId(),
            "purchaseletter_id" => $this->getPurchaseletter_id(),
            "changeownership_no" => $this->getChangeownership_no(),
            "changeownershipreason_id" => $this->getChangeownershipreason_id(),
            "description" => $this->getDescription(),
            "changeownership_date" => $this->getChangeownership_date(),
            "biaya" => $this->getBiaya(),
            "ktp" => $this->getKtp(),
            "name" => $this->getName(),
            "address" => $this->getAddress(),
            "telephone" => $this->getTelephone(),
            "mobilephone" => $this->getMobilephone(),
            "city_id" => $this->getCity_id()
            ,
            "city" => $this->getCity(),
            "email" => $this->getEmail(),
            "fax" => $this->getFax()
        );

        return $x;
    }

    function getPurchaseletter_id() {
        return $this->purchaseletter_id;
    }

    function getChangeownership_no() {
        return $this->changeownership_no;
    }

    function getChangeownershipreason_id() {
        return $this->changeownershipreason_id;
    }

    function getDescription() {
        return $this->description;
    }

    function getChangeownership_date() {
        return $this->changeownership_date;
    }

    function getBiaya() {
        return $this->biaya;
    }

    function getKtp() {
        return $this->ktp;
    }

    function getName() {
        return $this->name;
    }

    function getAddress() {
        return $this->address;
    }

    function getTelephone() {
        return $this->telephone;
    }

    function getMobilephone() {
        return $this->mobilephone;
    }

    function getCity_id() {
        return $this->city_id;
    }

    function setPurchaseletter_id($purchaseletter_id) {
        $this->purchaseletter_id = $purchaseletter_id;
    }

    function setChangeownership_no($changeownership_no) {
        $this->changeownership_no = $changeownership_no;
    }

    function setChangeownershipreason_id($changeownershipreason_id) {
        $this->changeownershipreason_id = $changeownershipreason_id;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setChangeownership_date($changeownership_date) {
        $this->changeownership_date = $changeownership_date;
    }

    function setBiaya($biaya) {
        $this->biaya = $biaya;
    }

    function setKtp($ktp) {
        $this->ktp = $ktp;
    }

    function setName($name) {
        $this->name = $name;
    }

    function setAddress($address) {
        $this->address = $address;
    }

    function setTelephone($telephone) {
        $this->telephone = $telephone;
    }

    function setMobilephone($mobilephone) {
        $this->mobilephone = $mobilephone;
    }

    function setCity_id($city_id) {
        $this->city_id = $city_id;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }




    /**
     * @return mixed
     */
    public function getFax()
    {
        return $this->fax;
    }

    /**
     * @param mixed $fax
     *
     * @return self
     */
    public function setFax($fax)
    {
        $this->fax = $fax;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * @param mixed $city_name
     *
     * @return self
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     *
     * @return self
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }
}
