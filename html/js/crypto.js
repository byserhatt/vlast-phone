var SelectedCryptoTab = Config.DefaultCryptoPage;
var ActionTab = null;
$(".cryptotab-"+SelectedCryptoTab).css({"display":"block"});
$(".crypto-header-footer").find('[data-cryptotab="'+SelectedCryptoTab+'"]').addClass('crypto-header-footer-item-selected');

var CryptoData = [];
CryptoData.Portfolio = 0;
CryptoData.Worth = 1000;
CryptoData.WalletId = null;
CryptoData.History = [];

function SetupCryptoData(Crypto) {
    CryptoData.History = Crypto.History;
    CryptoData.Portfolio = (Crypto.Portfolio).toFixed(6);
    CryptoData.Worth = Crypto.Worth;
    CryptoData.WalletId = Crypto.WalletId;

    $(".crypto-action-page-wallet").html("Wallet: "+CryptoData.Portfolio+" MD Bit('s)");
    $(".crypto-walletid").html(CryptoData.WalletId);
    $(".cryptotab-course-list").html("");
    if (CryptoData.History.length > 0) {
        CryptoData.History = CryptoData.History.reverse();
        $.each(CryptoData.History, function(i, change){
            var PercentageChange = ((change.NewWorth - change.PreviousWorth) / change.PreviousWorth) * 100;
            var PercentageElement = '<span style="color: green;" class="crypto-percentage-change"><i style="color: green; transform: rotate(-45deg);" class="fas fa-arrow-right"></i> +('+Math.ceil(PercentageChange)+'%)</span>';
            if (PercentageChange < 0 ) {
                PercentageChange = (PercentageChange * -1);
                PercentageElement = '<span style="color: red;" class="crypto-percentage-change"><i style="color: red; transform: rotate(125deg);" class="fas fa-arrow-right"></i> -('+Math.ceil(PercentageChange)+'%)</span>';
            }
            var Element =   '<div class="cryptotab-course-block">' +
                                '<i class="fas fa-exchange-alt"></i>' +
                                '<span class="cryptotab-course-block-title">Price Change</span>' +
                                '<span class="cryptotab-course-block-happening"><span style="font-size: 1.3vh;">$'+change.PreviousWorth+'</span> to <span style="font-size: 1.3vh;">$'+change.NewWorth+'</span>'+PercentageElement+'</span>' +
                            '</div>';
    
            $(".cryptotab-course-list").append(Element);                
        });
    }

    $(".crypto-portofolio").find('p').html(CryptoData.Portfolio);
    $(".crypto-course").find('p').html("$"+CryptoData.Worth);
    $(".crypto-volume").find('p').html("$"+Math.ceil(CryptoData.Portfolio * CryptoData.Worth));
}

function UpdateCryptoData(Crypto) {
    CryptoData.History = Crypto.History;
    CryptoData.Portfolio = (Crypto.Portfolio).toFixed(6);
    CryptoData.Worth = Crypto.Worth;
    CryptoData.WalletId = Crypto.WalletId;

    $(".crypto-action-page-wallet").html("Wallet: "+CryptoData.Portfolio+" MD Bit('s)");
    $(".crypto-walletid").html(CryptoData.WalletId);
    $(".cryptotab-course-list").html("");
    if (CryptoData.History.length > 0) {
        CryptoData.History = CryptoData.History.reverse();
        $.each(CryptoData.History, function(i, change){
            var PercentageChange = ((change.NewWorth - change.PreviousWorth) / change.PreviousWorth) * 100;
            var PercentageElement = '<span style="color: green;" class="crypto-percentage-change"><i style="color: green; transform: rotate(-45deg);" class="fas fa-arrow-right"></i> +('+Math.ceil(PercentageChange)+'%)</span>';
            if (PercentageChange < 0 ) {
                PercentageChange = (PercentageChange * -1);
                PercentageElement = '<span style="color: red;" class="crypto-percentage-change"><i style="color: red; transform: rotate(125deg);" class="fas fa-arrow-right"></i> -('+Math.ceil(PercentageChange)+'%)</span>';
            }
            var Element =   '<div class="cryptotab-course-block">' +
                                '<i class="fas fa-exchange-alt"></i>' +
                                '<span class="cryptotab-course-block-title">Price Change</span>' +
                                '<span class="cryptotab-course-block-happening"><span style="font-size: 1.3vh;">$'+change.PreviousWorth+'</span> to <span style="font-size: 1.3vh;">$'+change.NewWorth+'</span>'+PercentageElement+'</span>' +
                            '</div>';
    
            $(".cryptotab-course-list").append(Element);                
        });
    }

    $(".crypto-portofolio").find('p').html(CryptoData.Portfolio);
    $(".crypto-course").find('p').html("$"+CryptoData.Worth);
    $(".crypto-volume").find('p').html("$"+Math.ceil(CryptoData.Portfolio * CryptoData.Worth));
}

function RefreshCryptoTransactions(data) {
    $(".cryptotab-transactions-list").html("");
    if (data.CryptoTransactions.length > 0) {
        data.CryptoTransactions = (data.CryptoTransactions).reverse();
        $.each(data.CryptoTransactions, function(i, transaction){
            var Title = "<span style='color: red;'>Removed</span>"
            if (transaction.TransactionTitle == "Purchased") {
                Title = "<span style='color: green;'>Added</span>"
            }
            var Element = '<div class="cryptotab-transactions-block"> <i class="fas fa-exchange-alt"></i> <span class="cryptotab-transactions-block-title">'+Title+'</span> <span class="cryptotab-transactions-block-happening">'+transaction.TransactionMessage+'</span></div>';
            
            $(".cryptotab-transactions-list").append(Element);                
        });
    }
}

$(document).on('click', '.crypto-header-footer-item', function(e){
    e.preventDefault();

    var CurrentTab = $(".crypto-header-footer").find('[data-cryptotab="'+SelectedCryptoTab+'"]');
    var SelectedTab = this;
    var HeaderTab = $(SelectedTab).data('cryptotab');

    if (HeaderTab !== SelectedCryptoTab) {
        $(CurrentTab).removeClass('crypto-header-footer-item-selected');
        $(SelectedTab).addClass('crypto-header-footer-item-selected');
        $(".cryptotab-"+SelectedCryptoTab).css({"display":"none"});
        $(".cryptotab-"+HeaderTab).css({"display":"block"});
        SelectedCryptoTab = $(SelectedTab).data('cryptotab');
    }
});

$(document).on('click', '.cryptotab-general-action', function(e){
    e.preventDefault();

    var Tab = $(this).data('action');

    $(".crypto-action-page").css({"display":"block"});
    $(".crypto-action-page").animate({
        left: 0,
    }, 300);
    $(".crypto-action-page-"+Tab).css({"display":"block"});
    NM.Phone.Functions.HeaderTextColor("black", 300);
    ActionTab = Tab;
});

$(document).on('click', '#cancel-crypto', function(e){
    e.preventDefault();

    $(".crypto-action-page").animate({
        left: -30+"vh",
    }, 300, function(){
        $(".crypto-action-page-"+ActionTab).css({"display":"none"});
        $(".crypto-action-page").css({"display":"none"});
        ActionTab = null;
    });
    NM.Phone.Functions.HeaderTextColor("white", 300);
});

function CloseCryptoPage() {
    $(".crypto-action-page").animate({
        left: -30+"vh",
    }, 300, function(){
        $(".crypto-action-page-"+ActionTab).css({"display":"none"});
        $(".crypto-action-page").css({"display":"none"});
        ActionTab = null;
    });
    NM.Phone.Functions.HeaderTextColor("white", 300);
}

$(document).on('click', '#buy-crypto', function(e){
    e.preventDefault();

    var Coins = $(".crypto-action-page-buy-crypto-input-coins").val();
    var Price = $(".crypto-action-page-buy-crypto-input-money").val();

    if ((Coins !== "") && (Price !== "")) {
        if (NM.Phone.Data.PlayerData.money.bank >= Price) {
            $.post('http://qb-phone/BuyCrypto', JSON.stringify({
                Coins: Coins,
                Price: Price,
            }), function(CryptoData){
                if (CryptoData !== false) {
                    UpdateCryptoData(CryptoData)
                    CloseCryptoPage()
                    NM.Phone.Data.PlayerData.money.bank = parseInt(NM.Phone.Data.PlayerData.money.bank) - parseInt(Price);
                    NM.Phone.Notifications.Add("fas fa-university", "MD Bank", "تم خصم $ "+Price+",- ", "#badc58", 2500);
                } else {
                    NM.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "لاتمتلك الاْموال الكافية..", "#badc58", 1500);
                }
            });
        } else {
            NM.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "لاتمتلك الاْموال الكافية..", "#badc58", 1500);
        }
    } else {
        NM.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "قم بتعبئة البيانات بالكامل", "#badc58", 1500);
    }
});

$(document).on('click', '#sell-crypto', function(e){
    e.preventDefault();

    var Coins = $(".crypto-action-page-sell-crypto-input-coins").val();
    var Price = $(".crypto-action-page-sell-crypto-input-money").val();

    if ((Coins !== "") && (Price !== "")) {
        if (CryptoData.Portfolio >= parseInt(Coins)) {
            $.post('http://qb-phone/SellCrypto', JSON.stringify({
                Coins: Coins,
                Price: Price,
            }), function(CryptoData){
                if (CryptoData !== false) {
                    UpdateCryptoData(CryptoData)
                    CloseCryptoPage()
                    NM.Phone.Data.PlayerData.money.bank = parseInt(NM.Phone.Data.PlayerData.money.bank) + parseInt(Price);
                    NM.Phone.Notifications.Add("fas fa-university", "MD Bank", "تم خصم $ "+Price+",- ", "#badc58", 2500);
                } else {
                    NM.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "لاتمتلك أي MD Bits..", "#badc58", 1500);
                }
            });
        } else {
            NM.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "لاتمتلك أي MD Bits..", "#badc58", 1500);
        }
    } else {
        NM.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "قم بتعبئة البيانات بالكامل", "#badc58", 1500);
    }
});

$(document).on('click', '#transfer-crypto', function(e){
    e.preventDefault();

    var Coins = $(".crypto-action-page-transfer-crypto-input-coins").val();
    var WalletId = $(".crypto-action-page-transfer-crypto-input-walletid").val();

    if ((Coins !== "") && (WalletId !== "")) {
        if (CryptoData.Portfolio >= Coins) {
            if (WalletId !== CryptoData.WalletId) {
                $.post('http://qb-phone/TransferCrypto', JSON.stringify({
                    Coins: Coins,
                    WalletId: WalletId,
                }), function(CryptoData){
                    if (CryptoData == "notenough") {
                        NM.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "لاتمتلك أي MD Bits..", "#badc58", 1500);
                    } else if (CryptoData == "notvalid") {
                        NM.Phone.Notifications.Add("fas fa-university", "Crypto", "This Wallet ID does not exist!", "#badc58", 2500);
                    } else {
                        UpdateCryptoData(CryptoData)
                        CloseCryptoPage()
                        NM.Phone.Notifications.Add("fas fa-university", "Crypto", "تم تحويل "+Coins+",- to "+WalletId+"!", "#badc58", 2500);
                    }
                });
            } else {
                NM.Phone.Notifications.Add("fas fa-university", "Crypto", "لايمكنك التحويل لنفسك..", "#badc58", 2500);
            }
        } else {
            NM.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "لاتمتلك أي MD Bits..", "#badc58", 1500);
        }
    } else {
        NM.Phone.Notifications.Add("fas fa-chart-pie", "Crypto", "قم بتعبئة البيانات بالكامل", "#badc58", 1500);
    }
});

$(".crypto-action-page-buy-crypto-input-money").keyup(function(){
    var MoneyInput = this.value

    $(".crypto-action-page-buy-crypto-input-coins").val((MoneyInput / CryptoData.Worth).toFixed(6));
}); 

$(".crypto-action-page-buy-crypto-input-coins").keyup(function(){
    var MoneyInput = this.value

    $(".crypto-action-page-buy-crypto-input-money").val(Math.ceil(CryptoData.Worth * MoneyInput));
});

$(".crypto-action-page-sell-crypto-input-money").keyup(function(){
    var MoneyInput = this.value

    $(".crypto-action-page-sell-crypto-input-coins").val((MoneyInput / CryptoData.Worth).toFixed(6));
}); 

$(".crypto-action-page-sell-crypto-input-coins").keyup(function(){
    var MoneyInput = this.value

    $(".crypto-action-page-sell-crypto-input-money").val(Math.ceil(CryptoData.Worth * MoneyInput));
});