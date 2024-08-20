<?php


/**
 * Description of Profile
 *
 * @author MIS
 */
class Cashier_Box_Models_App_Profile {
    private $country;
    private $address;
    private $telp;
    private $fax;
    private $email;
    private $city;
    private $kodepos;
    
    public function getCountry() {
        return $this->country;
    }

    public function setCountry($country) {
        $this->country = $country;
    }

    public function getAddress() {
        return $this->address;
    }

    public function setAddress($address) {
        $this->address = $address;
    }

    public function getTelp() {
        return $this->telp;
    }

    public function setTelp($telp) {
        $this->telp = $telp;
    }

    public function getFax() {
        return $this->fax;
    }

    public function setFax($fax) {
        $this->fax = $fax;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getCity() {
        return $this->city;
    }

    public function setCity($city) {
        $this->city = $city;
    }

    public function getKodepos() {
        return $this->kodepos;
    }

    public function setKodepos($kodepos) {
        $this->kodepos = $kodepos;
    }


}

?>
