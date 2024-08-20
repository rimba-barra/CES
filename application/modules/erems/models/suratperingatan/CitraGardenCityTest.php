<?php

/**
 * Description of Default
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_CitraGardenCityTest {
    
    public function getListTagihanHTML($params){
		function tgl_indo($tanggal){
	$bulan = array (
		1 =>   'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember'
	);
	$pecahkan = explode('-', $tanggal);
	
	// variabel pecahkan 0 = tanggal
	// variabel pecahkan 1 = bulan
	// variabel pecahkan 2 = tahun
 
	return $pecahkan[2] . ' ' . $bulan[ (int)$pecahkan[1] ] . ' ' . $pecahkan[0];
}
        $schedule = $params["schedule"][0];
        $total = 0.0;
        $ttldenda_terlambatb=0;
        $ttlremaining_balance=0;
        $table = "";

        foreach($schedule as $row){
            if($row['indicatorname'] == 'denda'){
                $denda = $row["remaining_denda"];
            }else{
                $denda = $row["denda_terlambatb"];
            }
            $ttldenda_terlambatb=$ttldenda_terlambatb+$denda;
            $ttlremaining_balance=$ttlremaining_balance+$row["remaining_balance"];
            $table .='<tr>
                        <!--<td>'.$row["scheduletype"].'</td>
                        <td>'.$row["termin"].'</td>-->
                        <td>'.tgl_indo(date('Y-m-d',strtotime($row["duedate"]))).'</td>
                        <td align="right">Rp. '.number_format($row["remaining_balance"]).'</td>
                        <!--<td>'.$row["hari_terlambatb"].'</td><td>'.$row["sp_no"].'</td>--> 
                        <td align="right">Rp. '.number_format($denda).'</td>
                        <td align="right">Rp. '.number_format($row["remaining_balance"]+round($denda)).'</td>
                    </tr>';
        }

        $table .='<tr><!--<td>&nbsp</td><td>&nbsp</td>--><td>Total </td><td align="right">Rp. '.number_format($ttlremaining_balance).'</td>
                <!--<td></td><td></td>--> <td align="right">Rp. '.number_format($ttldenda_terlambatb).'</td><td align="right">Rp. '.number_format($ttlremaining_balance+$ttldenda_terlambatb).'</td></tr>';

        return $table;
    }
	
	public function getHTMLdefault(){
       return $this->getHTML();
    }
    
	public function getHTML($spke=null){

        $tpl1=
        '<style>
				
				
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:12px;
                }
				
                td{
                    padding:2px 10px;
                }
                body{
                    font-family: "Comic Sans MS", "Comic Sans", cursive;
                }
                p.spstyle_p, div {
                    font-size: 12px;
                }
                p.spstyle_p_small{
                    font-size: 10px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
                <p class="spstyle_p">Jakarta, <b>{{tanggal_print_w}}</b></p>
                <p class="spstyle_p">No. Ref : <b>{{nomor_sp_teratas}}</b><br/>
                    Hal : <b><u>Surat  Pemberitahuan {{sp_surat_ke}}</b></u> </p> 

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    Bapak/Ibu <b>{{customer_name}}</b><br>
                    {{customer_address}}</p>

                <p class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';
            
            $tpl2 = 
                'Menindaklanjuti <b>Surat Pemberitahuan 1</b> kami pada tanggal {{tgl_sp1}} No.{{sp1}}. Bersama ini kami beritahukan kepada Bapak/Ibu selaku pembeli unit <b>{{unit_number}}</b> , <b>cluster {{cluster}}</b>, bahwa berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal <b>{{tanggal_print_w}}</b> belum melaksanakan pembayaran angsuran yang telah jatuh tempo, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah) :</p>        
                        <br/>';

            $tpl3 = 
                'Bersama surat ini kami beritahukan kepada Bapak/Ibu selaku pembeli unit <b>{{unit_number}}, cluster {{cluster}}</b>, bahwa berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal <b>{{tanggal_print_w}}</b> belum melaksanakan pembayaran angsuran yang telah jatuh tempo. Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah) :
                        </p>        
                        ';
						
			$tpl4 = 
                'Menindaklanjuti <b>Surat Pemberitahuan 2</b> kami tanggal {{tgl_sp2}} No.{{sp2}}, bersama ini kami beritahukan kepada Bapak/Ibu selaku pembeli unit <b>{{unit_number}}</b> , cluster {{cluster}},bahwa berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal <b>{{tanggal_print_w}}</b> belum melaksanakan pembayaran yang telah jatuh tempo. Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah) :</p>        
                        <br/>';
			
			$tpl5 ='Menindaklanjuti <b>Surat Pemberitahuan 3</b>, tertanggal {{tgl_sp3}} No.{{sp3}}, kami tegaskan kepada Bapak/Ibu selaku pembeli unit <b>{{unit_number}}</b> , cluster {{cluster}},bahwa pemesanan unit tersebut menjadi <b>batal.</b>
			<br/><br/>
			Keseluruhan <b>uang</b> yang telah Bapak /Ibu bayarkan <b>tidak dapat  dikembalikan.</b> Dengan demikian kami <b>berhak menjual</b> kembali unit tersebut kepada pihak lain.
			<br>
			<br>
			Demikian hal ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.';
			
			$tpl6 ='<br/>
			<table width=100%>
				<tbody align="center">
				<tr style="background-color: #e8e9ea;font-weight: bold;">
				<!--<td>Tagihan</td>
					<td>Termin</td>-->
					<td>Tunggakan Bulan</td>
					<td>Cicilan Pokok</td>
					<!--<td>Keterlambatan (hari) </td>
					<td>Nomor SP - Tanggal SP</td>-->
					<td>Denda Keterlambatan <br>( s/d {{max_date_w}} )</td>
					<td>Total Dibayar <br>( s/d {{max_date_w}} )</td>
                </tr> 
                {{{list_tagihan}}}
                </tbody></table>
                <br/>
				
			{{{pageBreak3}}}   
			<b>Denda keterlambatan diatas akan berubah sampai dengan pembayaran dan dihitung sejak tgl. terhutang.</b>
                        <br/> <p class="spstyle_p">
			Sehubungan dengan hal diatas, mohon Bapak/Ibu dapat segera melakukan pembayaran dengan cara:	
                        </p>
				<p>
				&nbsp;&nbsp;&nbsp;&nbsp;Transfer ke : <b>Virtual Account {{va_bca}}</b> dan segera ditukar dengan kuitansi di City Management Office, <br>
				&nbsp;&nbsp;&nbsp;&nbsp;Citra 2 Ext, Blok BG. 2A No. 01, Citra Garden City, Jakarta Barat.
				</p>
							';
			
			$tpl7 ='Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran tunggakan diatas. Bapak/Ibu dapat menghubungi petugas Collection kami, sdri. <b>Ervinna</b> di no. telp. <b>6198177 ext. 712</b>
					<br/>
            Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih. ';
			
			$tpl8 = 'Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran tunggakan diatas. Untuk tindak lanjut penyelesaian dapat menghubungi petugas collection kami, sdri. <b>Ervinna</b> di no. telp. <b>6198177 ext. 712</b>
					<br/><br/>
            Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih. ';
			
            $tpl9 = '<style>
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:12px;
                }
                td{
                    padding:2px 10px;
                }
                body{
                    font-family: "Comic Sans MS", "Comic Sans", cursive;
                }
                p.spstyle_p, div {
                    font-size: 12px;
                }
                p.spstyle_p_small{
                    font-size: 10px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
                <p class="spstyle_p">Jakarta, <b>{{tanggal_print_w}}</b></p>
                <p class="spstyle_p">No	: <b>{{nomor_sp_teratas}}</b><br/>
                    Hal	: <b>Surat  Pembatalan</b></p> <br/>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p><br/>

                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">'; 
			
			$tpl10 = 'Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran diatas. Untuk tindak lanjut penyelesaian dapat menghubungi petugas collection kami, sdri. <b>Ervinna</b> di no. telp. <b>6198177 ext. 712</b>
			<br>
			<br>
			Apabila lewat dari tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka dengan sangat menyesal kami mengganggap Bapak/Ibu <b>membatalkan pemesanan unit</b> tersebut. Keseluruhan uang yang telah Bapak/Ibu bayarkan <b>tidak dapat dikembalikan.</b> Dengan demikian kami <b>berhak menjual kembali unit</b> tersebut kepada pihak lain.
					
					<br/>
            Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih. '; 
			
			$tpl11 = '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
				<b>PT. CITRA ADYAPATAKA</b></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>MAYA ROSTINA</u></b><br/>
				<!-- --------------------------------------<br/> -->
				Finance Departement Head
				<!--{{salesman_name}} (Sales)<br/>-->
                </p>

                <p class="spstyle_p_small"><b>Note</b> : <i>Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke VA BCA, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>
                </body>
                ';
            $tpl12 .= '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
				<b>PT. CITRA ADYAPATAKA</b></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>NARARYA CIPUTRA SASTRAWINATA</u></b><br/>
				<!-- --------------------------------------<br/> -->
				Kuasa Direksi
				<!--{{salesman_name}} (Sales)<br/>-->
                </p>

                <!--<p class="spstyle_p_small"><b>Note</b> : <i>Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke VA BCA, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>-->
                </body>
                ';
			
        if($spke==1){
            $tpl = $tpl1.$tpl3.$tpl6.$tpl8.$tpl11;
        }
        elseif($spke==2){
            $tpl = $tpl1.$tpl2.$tpl6.$tpl7.$tpl11;
        }
        elseif($spke==3){
            $tpl = $tpl1.$tpl4.$tpl6.$tpl10.$tpl11;
        }
        elseif($spke==4){
            $tpl = $tpl9.$tpl5.$tpl12;
        }else{
            $tpl = $tpl1.$tpl3.$tpl6.$tpl7.$tpl11;
        }
        
        return $tpl;
    }
}
