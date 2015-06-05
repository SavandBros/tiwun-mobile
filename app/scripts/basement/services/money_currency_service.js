/*global angular*/
'use strict';

/**
 * MoneyCurrencyService
 *
 * @class MoneyCurrencyService
 * @namespace tiwun.basement.services.MoneyCurrencyService
 */
function MoneyCurrencyService() {
    var MoneyFormats = {
        'AED': {
            'moneyFormat': 'Dhs. {}',
            'moneyWithCurrencyFormat': 'Dhs. {} AED'
        },
        'ALL': {
            'moneyFormat': 'Lek {}',
            'moneyWithCurrencyFormat': 'Lek {} ALL'
        },
        'AMD': {
            'moneyFormat': '{} AMD',
            'moneyWithCurrencyFormat': '{} AMD'
        },
        'ANG': {
            'moneyFormat': 'ƒ{}',
            'moneyWithCurrencyFormat': '{} NAƒ'
        },
        'AOA': {
            'moneyFormat': 'Kz{}',
            'moneyWithCurrencyFormat': 'Kz{} AOA'
        },
        'ARS': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${} ARS'
        },
        'AUD': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${} AUD'
        },
        'AWG': {
            'moneyFormat': 'Afl{}',
            'moneyWithCurrencyFormat': 'Afl{} AWG'
        },
        'AZN': {
            'moneyFormat': 'm.{}',
            'moneyWithCurrencyFormat': 'm.{} AZN'
        },
        'BAM': {
            'moneyFormat': 'KM {}',
            'moneyWithCurrencyFormat': 'KM {} BAM'
        },
        'BBD': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${} Bds'
        },
        'BDT': {
            'moneyFormat': 'Tk {}',
            'moneyWithCurrencyFormat': 'Tk {} BDT'
        },
        'BGN': {
            'moneyFormat': '{} лв',
            'moneyWithCurrencyFormat': '{} лв BGN'
        },
        'BHD': {
            'moneyFormat': '{} BD',
            'moneyWithCurrencyFormat': '{} BHD'
        },
        'BND': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${} BND'
        },
        'BOB': {
            'moneyFormat': 'Bs{}',
            'moneyWithCurrencyFormat': 'Bs{} BOB'
        },
        'BRL': {
            'moneyFormat': 'R$ {}',
            'moneyWithCurrencyFormat': 'R$ {} BRL'
        },
        'BSD': {
            'moneyFormat': 'BS${}',
            'moneyWithCurrencyFormat': 'BS${} BSD'
        },
        'BTN': {
            'moneyFormat': 'Nu {}',
            'moneyWithCurrencyFormat': 'Nu {} BTN'
        },
        'BWP': {
            'moneyFormat': 'P{}',
            'moneyWithCurrencyFormat': 'P{} BWP'
        },
        'BYR': {
            'moneyFormat': 'Br {}',
            'moneyWithCurrencyFormat': 'Br {} BYR'
        },
        'BZD': {
            'moneyFormat': 'BZ${}',
            'moneyWithCurrencyFormat': 'BZ${} BZD'
        },
        'CAD': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${} CAD'
        },
        'CHF': {
            'moneyFormat': 'SFr. {}',
            'moneyWithCurrencyFormat': 'SFr. {} CHF'
        },
        'CLP': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${} CLP'
        },
        'CNY': {
            'moneyFormat': '¥{}',
            'moneyWithCurrencyFormat': '¥{} CNY'
        },
        'COP': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${} COP'
        },
        'CRC': {
            'moneyFormat': '₡ {}',
            'moneyWithCurrencyFormat': '₡ {} CRC'
        },
        'CZK': {
            'moneyFormat': '{} Kč',
            'moneyWithCurrencyFormat': '{} Kč'
        },
        'DKK': {
            'moneyFormat': '{}',
            'moneyWithCurrencyFormat': 'kr.{}'
        },
        'DOP': {
            'moneyFormat': 'RD$ {}',
            'moneyWithCurrencyFormat': 'RD$ {}'
        },
        'DZD': {
            'moneyFormat': 'DA {}',
            'moneyWithCurrencyFormat': 'DA {} DZD'
        },
        'EGP': {
            'moneyFormat': 'LE {}',
            'moneyWithCurrencyFormat': 'LE {} EGP'
        },
        'ETB': {
            'moneyFormat': 'Br{}',
            'moneyWithCurrencyFormat': 'Br{} ETB'
        },
        'EUR': {
            'moneyFormat': '€{}',
            'moneyWithCurrencyFormat': '€{} EUR'
        },
        'FJD': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': 'FJ${}'
        },
        'GBP': {
            'moneyFormat': '£{}',
            'moneyWithCurrencyFormat': '£{} GBP'
        },
        'GEL': {
            'moneyFormat': '{} GEL',
            'moneyWithCurrencyFormat': '{} GEL'
        },
        'GHS': {
            'moneyFormat': 'GH₵{}',
            'moneyWithCurrencyFormat': 'GH₵{}'
        },
        'GMD': {
            'moneyFormat': 'D {}',
            'moneyWithCurrencyFormat': 'D {} GMD'
        },
        'GTQ': {
            'moneyFormat': 'Q{}',
            'moneyWithCurrencyFormat': '{} GTQ'
        },
        'GYD': {
            'moneyFormat': 'G${}',
            'moneyWithCurrencyFormat': '${} GYD'
        },
        'HKD': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': 'HK${}'
        },
        'HNL': {
            'moneyFormat': 'L {}',
            'moneyWithCurrencyFormat': 'L {} HNL'
        },
        'HRK': {
            'moneyFormat': '{} kn',
            'moneyWithCurrencyFormat': '{} kn HRK'
        },
        'HUF': {
            'moneyFormat': '{}',
            'moneyWithCurrencyFormat': '{} Ft'
        },
        'IDR': {
            'moneyFormat': '{}',
            'moneyWithCurrencyFormat': 'Rp {}'
        },
        'ILS': {
            'moneyFormat': '{} NIS',
            'moneyWithCurrencyFormat': '{} NIS'
        },
        'INR': {
            'moneyFormat': 'Rs. {}',
            'moneyWithCurrencyFormat': 'Rs. {}'
        },
        'ISK': {
            'moneyFormat': '{} kr',
            'moneyWithCurrencyFormat': '{} kr ISK'
        },
        'JEP': {
            'moneyFormat': '£{}',
            'moneyWithCurrencyFormat': '£{} JEP'
        },
        'JMD': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${} JMD'
        },
        'JOD': {
            'moneyFormat': '{} JD',
            'moneyWithCurrencyFormat': '{} JOD'
        },
        'JPY': {
            'moneyFormat': '¥{}',
            'moneyWithCurrencyFormat': '¥{} JPY'
        },
        'KES': {
            'moneyFormat': 'KSh{}',
            'moneyWithCurrencyFormat': 'KSh{}'
        },
        'KGS': {
            'moneyFormat': 'лв{}',
            'moneyWithCurrencyFormat': 'лв{}'
        },
        'KHR': {
            'moneyFormat': 'KHR{}',
            'moneyWithCurrencyFormat': 'KHR{}'
        },
        'KRW': {
            'moneyFormat': '₩{}',
            'moneyWithCurrencyFormat': '₩{} KRW'
        },
        'KWD': {
            'moneyFormat': '{} KD',
            'moneyWithCurrencyFormat': '{} KWD'
        },
        'KYD': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${} KYD'
        },
        'KZT': {
            'moneyFormat': '{} KZT',
            'moneyWithCurrencyFormat': '{} KZT'
        },
        'LBP': {
            'moneyFormat': 'L£{}',
            'moneyWithCurrencyFormat': 'L£{} LBP'
        },
        'LKR': {
            'moneyFormat': 'Rs {}',
            'moneyWithCurrencyFormat': 'Rs {} LKR'
        },
        'LTL': {
            'moneyFormat': '{} Lt',
            'moneyWithCurrencyFormat': '{} Lt'
        },
        'LVL': {
            'moneyFormat': 'Ls {}',
            'moneyWithCurrencyFormat': 'Ls {} LVL'
        },
        'MAD': {
            'moneyFormat': '{} dh',
            'moneyWithCurrencyFormat': 'Dh {} MAD'
        },
        'MDL': {
            'moneyFormat': '{} MDL',
            'moneyWithCurrencyFormat': '{} MDL'
        },
        'MGA': {
            'moneyFormat': 'Ar {}',
            'moneyWithCurrencyFormat': 'Ar {} MGA'
        },
        'MKD': {
            'moneyFormat': 'ден {}',
            'moneyWithCurrencyFormat': 'ден {} MKD'
        },
        'MMK': {
            'moneyFormat': 'K{}',
            'moneyWithCurrencyFormat': 'K{} MMK'
        },
        'MNT': {
            'moneyFormat': '{} ₮',
            'moneyWithCurrencyFormat': '{} MNT'
        },
        'MOP': {
            'moneyFormat': 'MOP${}',
            'moneyWithCurrencyFormat': 'MOP${}'
        },
        'MUR': {
            'moneyFormat': 'Rs {}',
            'moneyWithCurrencyFormat': 'Rs {} MUR'
        },
        'MVR': {
            'moneyFormat': 'Rf{}',
            'moneyWithCurrencyFormat': 'Rf{} MRf'
        },
        'MXN': {
            'moneyFormat': '$ {}',
            'moneyWithCurrencyFormat': '$ {} MXN'
        },
        'MYR': {
            'moneyFormat': 'RM{} MYR',
            'moneyWithCurrencyFormat': 'RM{} MYR'
        },
        'MZN': {
            'moneyFormat': '{} Mt',
            'moneyWithCurrencyFormat': 'Mt {} MZN'
        },
        'NAD': {
            'moneyFormat': 'N${}',
            'moneyWithCurrencyFormat': 'N${} NAD'
        },
        'NGN': {
            'moneyFormat': '₦{}',
            'moneyWithCurrencyFormat': '₦{} NGN'
        },
        'NIO': {
            'moneyFormat': 'C${}',
            'moneyWithCurrencyFormat': 'C${} NIO'
        },
        'NOK': {
            'moneyFormat': 'kr {}',
            'moneyWithCurrencyFormat': 'kr {} NOK'
        },
        'NPR': {
            'moneyFormat': 'Rs{}',
            'moneyWithCurrencyFormat': 'Rs{} NPR'
        },
        'NZD': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${} NZD'
        },
        'OMR': {
            'moneyFormat': '{} OMR',
            'moneyWithCurrencyFormat': '{} OMR'
        },
        'PEN': {
            'moneyFormat': 'S/. {}',
            'moneyWithCurrencyFormat': 'S/. {} PEN'
        },
        'PGK': {
            'moneyFormat': 'K {}',
            'moneyWithCurrencyFormat': 'K {} PGK'
        },
        'PHP': {
            'moneyFormat': '₱{}',
            'moneyWithCurrencyFormat': '₱{} PHP'
        },
        'PKR': {
            'moneyFormat': 'Rs.{}',
            'moneyWithCurrencyFormat': 'Rs.{} PKR'
        },
        'PLN': {
            'moneyFormat': '{} zl',
            'moneyWithCurrencyFormat': '{} zl PLN'
        },
        'PYG': {
            'moneyFormat': 'Gs. {}',
            'moneyWithCurrencyFormat': 'Gs. {} PYG'
        },
        'QAR': {
            'moneyFormat': 'QAR {}',
            'moneyWithCurrencyFormat': 'QAR {}'
        },
        'RON': {
            'moneyFormat': '{} lei',
            'moneyWithCurrencyFormat': '{} lei RON'
        },
        'RSD': {
            'moneyFormat': '{} RSD',
            'moneyWithCurrencyFormat': '{} RSD'
        },
        'RUB': {
            'moneyFormat': 'руб{}',
            'moneyWithCurrencyFormat': 'руб{} RUB'
        },
        'RWF': {
            'moneyFormat': '{} RF',
            'moneyWithCurrencyFormat': '{} RWF'
        },
        'SAR': {
            'moneyFormat': '{} SR',
            'moneyWithCurrencyFormat': '{} SAR'
        },
        'SCR': {
            'moneyFormat': 'Rs {}',
            'moneyWithCurrencyFormat': 'Rs {} SCR'
        },
        'SEK': {
            'moneyFormat': '{} kr',
            'moneyWithCurrencyFormat': '{} kr SEK'
        },
        'SGD': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${} SGD'
        },
        'STD': {
            'moneyFormat': 'Db {}',
            'moneyWithCurrencyFormat': 'Db {} STD'
        },
        'SYP': {
            'moneyFormat': 'S£{}',
            'moneyWithCurrencyFormat': 'S£{} SYP'
        },
        'THB': {
            'moneyFormat': '{} ฿',
            'moneyWithCurrencyFormat': '{} ฿ THB'
        },
        'TND': {
            'moneyFormat': '{}',
            'moneyWithCurrencyFormat': '{} DT'
        },
        'TRY': {
            'moneyFormat': '{}TL',
            'moneyWithCurrencyFormat': '{}TL'
        },
        'TTD': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${} TTD'
        },
        'TWD': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${} TWD'
        },
        'TZS': {
            'moneyFormat': '{} TZS',
            'moneyWithCurrencyFormat': '{} TZS'
        },
        'UAH': {
            'moneyFormat': '₴{}',
            'moneyWithCurrencyFormat': '₴{} UAH'
        },
        'UGX': {
            'moneyFormat': 'Ush {}',
            'moneyWithCurrencyFormat': 'Ush {} UGX'
        },
        'USD': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${} USD'
        },
        'UYU': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${} UYU'
        },
        'VEF': {
            'moneyFormat': 'Bs. {}',
            'moneyWithCurrencyFormat': 'Bs. {} VEF'
        },
        'VND': {
            'moneyFormat': '{}₫',
            'moneyWithCurrencyFormat': '{} VND'
        },
        'VUV': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': '${}VT'
        },
        'WST': {
            'moneyFormat': 'WS$ {}',
            'moneyWithCurrencyFormat': 'WS$ {} WST'
        },
        'XAF': {
            'moneyFormat': 'FCFA{}',
            'moneyWithCurrencyFormat': 'FCFA{} XAF'
        },
        'XBT': {
            'moneyFormat': '{} BTC',
            'moneyWithCurrencyFormat': '{} BTC'
        },
        'XCD': {
            'moneyFormat': '${}',
            'moneyWithCurrencyFormat': 'EC${}'
        },
        'XOF': {
            'moneyFormat': 'CFA{}',
            'moneyWithCurrencyFormat': 'CFA{} XOF'
        },
        'XPF': {
            'moneyFormat': '{} XPF',
            'moneyWithCurrencyFormat': '{} XPF'
        },
        'ZAR': {
            'moneyFormat': 'R {}',
            'moneyWithCurrencyFormat': 'R {} ZAR'
        },
        'ZMW': {
            'moneyFormat': 'K{}',
            'moneyWithCurrencyFormat': 'ZMW{}'
        }
    };

    /**
     * currencyFormats
     *
     * Return an Array of currency formats
     *
     * @method currencyFormats
     * @returns {Array}
     */
    function currencyFormats() {
        return Object.keys(MoneyFormats);
    }

    /**
     * moneyFormat
     *
     * Return money format of given money currency and amount.
     *
     * @method moneyFormat
     * @param {String} moneyCurrency
     * @param {Number} amount
     * @returns {*|XML|string|void}
     */
    function moneyFormat(moneyCurrency, amount) {
        return MoneyFormats[moneyCurrency]['moneyFormat'].replace('{}', amount);
    }

    /**
     * moneyWithCurrencyFormat
     *
     * Return money with currency format of given money currency and amount.
     *
     * @method moneyWithCurrencyFormat
     * @param {String} moneyCurrency
     * @param {Number} amount
     * @returns {*|XML|string|void}
     */
    function moneyWithCurrencyFormat(moneyCurrency, amount) {
        return MoneyFormats[moneyCurrency]['moneyWithCurrencyFormat'].replace('{}', amount);
    }

    return {
        MoneyFormats: MoneyFormats,
        currencyFormats: currencyFormats,
        moneyFormat: moneyFormat,
        moneyWithCurrencyFormat: moneyWithCurrencyFormat
    }

}

angular.module('tiwun.basement.services.MoneyCurrencyService', [])
    .factory('MoneyCurrencyService', MoneyCurrencyService);

MoneyCurrencyService.$inject = [];
