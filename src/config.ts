// @mui
import { arSD, enUS, frFR, viVN, zhCN } from '@mui/material/locale';
// components
// routes
import { PATH_DASHBOARD } from './routes/paths';

export const APP_ENV = 'DEV' as any;
// API
// ----------------------------------------------------------------------
export const STRIPE_API_KEY = APP_ENV !== 'PROD' ?
  'pk_test_51M2T6kL1Sw0NbnnPb7pGOyseDYywfbUynSG6FeNU6WN280fHcKaTRzPuQ5is0Xad918yEr0xZmVxDcpDUoroJWVg005ntPfUHv' : 'pk_live_51M2T6kL1Sw0NbnnPzLn7gXxc3jKDRintKxhP33HogbWfKdlP4jz8xKdBeYWco2L8iHrWSzFLelpWrQ2ppWw2Ygcq00vy4JvHmU';

export const HOST_API = process.env.REACT_APP_HOST_API_KEY || '';

export const FIREBASE_API = APP_ENV !== 'PROD' ? {
  apiKey: "AIzaSyBZdpcJuqI_VESfWEsqqgAnk0567jF0OWI",
  authDomain: "subscribe-staging.firebaseapp.com",
  projectId: "subscribe-staging",
  storageBucket: "subscribe-staging.appspot.com",
  messagingSenderId: "1010540332394",
  appId: "1:1010540332394:web:dce03a81946ec4ce3f5113",
  measurementId: "G-4X5WE8TZ2S"
} : {
  apiKey: "AIzaSyCJqQy06nbh9Oiy1Bq8T7kq_EjGQ3WFyIM",
  authDomain: "subscriptionapp-prod.firebaseapp.com",
  projectId: "subscriptionapp-prod",
  storageBucket: "subscriptionapp-prod.appspot.com",
  messagingSenderId: "903678673561",
  appId: "1:903678673561:web:cde481a2c356e93c1e2e08"
};

let PATH_NEW_TEST;


PATH_NEW_TEST = PATH_DASHBOARD.app;

export const PATH_AFTER_LOGIN = PATH_NEW_TEST;

// LAYOUT
// ----------------------------------------------------------------------
export const CURRENCY = '$';

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const defaultSettings: any = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeContrast: 'default',
  themeLayout: 'horizontal',
  themeColorPresets: 'default',
  themeStretch: true,
};

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: '/assets/icons/flags/ic_flag_fr.svg',
  },
  {
    label: 'Vietnamese',
    value: 'vn',
    systemValue: viVN,
    icon: '/assets/icons/flags/ic_flag_vn.svg',
  },
  {
    label: 'Chinese',
    value: 'cn',
    systemValue: zhCN,
    icon: '/assets/icons/flags/ic_flag_cn.svg',
  },
  {
    label: 'Arabic (Sudan)',
    value: 'ar',
    systemValue: arSD,
    icon: '/assets/icons/flags/ic_flag_sa.svg',
  },
];

export const defaultLang = allLangs[0]; // English


export const ENV = 'staging';

export const CustomerURL = APP_ENV !== 'PROD' ? 'https://dev.subscription.app/' : 'https://subscription.app/';


export const Agreement = `
<div>
      <h4>SUBSCRIPTION.APP</h4>
      <h4>TERMS AND CONDITIONS</h4>
      <h4>SUBSCRIBER AGREEMENT</h4>
      <br />
      <p>
        PLEASE READ THESE <strong><strong>#merchant</strong></strong>, SUBSCRIPTION TERMS OF SERVICE CAREFULLY AS THEY CONTAIN
        IMPORTANT INFORMATION REGARDING YOUR SUBSCRIPTION, USE OF OUR PRODUCT/SERVICES, LEGAL
        RIGHTS, REMEDIES, AND OBLIGATIONS. THESE INCLUDE VARIOUS LIMITATIONS AND EXCLUSIONS, AND A
        CLAUSE THAT GOVERNS THE JURISDICTION AND VENUE OF DISPUTES. PLEASE NOTE THAT YOUR USE OF AND
        ACCESS TO OUR SERVICES (DEFINED BELOW) ARE SUBJECT TO THE FOLLOWING TERMS. IF YOU DO NOT
        AGREE TO ALL OF THE FOLLOWING, YOU MAY NOT USE OR ACCESS THE SERVICES. THIS DOCUMENT
        (“SUBSCRIPTION TERMS OF SERVICE”) CONSISTS OF THE FOLLOWING PARTS: (1) THE TERMS OF
        SUBSCRIPTION; (2) TERMS AND CONDITIONS; AND (3) GENERAL TERMS, AND IS ENTERED INTO BY THE
        SUBSCRIBER ENROLLING IN THE name SUBSCRIPTION PROGRAM (“SUBSCRIBER”, “YOU”, OR “YOUR”) AND
        MERCHANT COMPANY NAME, (HEREAFTER REFERRED TO AS <strong><strong>#merchant</strong></strong>, “WE”,“US”, OR “OUR”). If
        changes are made to these <strong><strong>#merchant</strong></strong> Subscription Terms of Service, you will be notified
        via email.
      </p>
      <br />
      <p>
        <strong><strong>#merchant</strong></strong> provides an online platform through which subscribers of <strong><strong>#merchant</strong></strong> can use
        the products or services of <strong><strong>#merchant</strong></strong>. The platform is accessible at <strong><strong>#merchant</strong></strong>’s
        website. By using the Services, you agree to comply with and be legallybound by these
        Subscription Terms of Service.
      </p>
      <br />
      <p>
        These Subscription Terms of Service govern your access to and use of the Services,
        yourparticipation in the Referral Program (defined below), any other interaction you have
        with <strong><strong>#merchant</strong></strong> in connection with the Services and constitutes a binding legal agreement
        between you and <strong><strong>#merchant</strong></strong>. Please carefully read these Subscription Terms of Service and
        our Privacy Policy, which may be found at <strong><strong>#merchant</strong></strong>’s website and which is incorporated
        herein by reference. If you do not agree to these Subscription Terms of Service and our
        Privacy Policy, you have no right to obtain information about <strong><strong>#merchant</strong></strong>’s subscription
        or otherwise continue using the Services. Failure to use the Services in accordance with
        these Subscription Terms of Service and our Privacy Policy may, among other possible
        consequences, result in your termination as a Subscriber andprohibition against your use of
        the Services.
      </p>
      <br />
      <p>
        Certain Services may have different terms and conditions posted or may require you toagree
        with and to accept additional terms and conditions (“Additional Terms”). If there isa
        conflict between these Subscription Terms of Service and the Additional Terms, the
        Additional Terms take precedence with respect to your use of or access to those Services.
      </p>
      <br />
      <p>
        YOU HAVE READ, UNDERSTAND, AND AGREE TO BE BOUND BY THESE Subscription TERMS OF SERVICE,
        WHETHER OR NOT YOU HAVE REGISTERED WITH US. IF YOU DO NOT AGREE TO THESE Subscription TERMS
        OF SERVICE THEN YOU SHALL NOT ACCESS OR USE THE SERVICES.
      </p>
      <br />
      <p>
        If you accept or agree to these Subscription Terms of Service on behalf of a company orother
        legal entity, you represent and warrant that you have the authority to bind that company or
        other legal entity to these Subscription Terms of Service and, in such event,“you” and
        “your” will refer and apply to that company or other legal entity.
      </p>
      <h5>
        <strong>Modification</strong>
      </h5>
      <br />
      <p>
        <strong><strong>#merchant</strong></strong> reserves the right, at its sole discretion, to modify and update the Services
        or to modify these Subscription Terms of Service, excluding Fees (as defined below), at any
        time and without prior notice. If we modify these Subscription Terms of Service, we will
        provide you with an email notice of the modification. We will also update the “Last Updated
        Date” at the top of these Subscription Terms of Service. By continuing to access or use the
        Services after we have posted a modification on the Services or have provided you with an
        email notice of a modification, you agree to be bound by the modified Subscription Terms of
        Service. If the modified Subscription Terms of Service are not acceptable to you, you must
        cease using the Services. Fees may be modified with notice and acceptance by Subscriber,
        non-acceptance of revised fees may result in termination of your Subscription
      </p>
      <br />
      <h5>
        <strong>Terms of Subscription</strong>
      </h5>
      <br />
      <h3>Subscription Fees and Collections</h3>
      <br />
      <p>
        In order to access and use the Services, Subscriber agrees to pay <strong><strong>#merchant</strong></strong> the
        following fees (collectively, “Fees”)
      </p>
      <br />
      <ul style={{ listStyleType: 'none' }}>
        <li>
          Initiation Fee if applicable. Subscriber will pay to <strong><strong>#merchant</strong></strong> an initiation fee in
          the amount that applies to Subscriber’s Subscription tier choice (the “Initiation Fee”) if
          applicable. The Initiation Fee is non-refundable once your Subscription becomes Active.
          Once your subscription is approved; and you are able to use the Services/products.
        </li>
      </ul>
      <br />
      <p>Subscription Dues</p> <br />
      <ul style={{ listStyleType: 'none' }}>
        <li>
          Monthly/Weekly/Daily/Yearly Dues whichever is applicable. You will pay theapplicable
          subscription dues through an automatic payment plan set up duringSubscription onboarding.
          The payment of the Monthly Dues will begin on the date ofyour Subscription onboarding and
          will be due each month until the Services are either terminated by <strong><strong>#merchant</strong></strong> or
          canceled by you in accordance with <strong><strong>#merchant</strong></strong>’s cancellation policy described in
          Section 1.6 below.
        </li>
        <br /> <h4>Collections.</h4>
        <li>
          If you do not pay all amounts due to us under these Subscription Terms of Servicewhen due,
          including all charges, fees, expenses, fines, penalties, and all matters associated with
          the use of product or service, you agree to pay a late charge of 2% per month on the past
          due balance or the highest rate permitted by applicable law, whichever is less
          (collectively, “Charges”). You agree to also pay for any costs that we incur in seeking to
          collect such Charges including, without limitation, court costs and attorney’s fees in
          addition to any administrative fees, cost of recovery, insufficient funds fees and
          collection fees (collectively, “Costs”). You also agree that we or our collection agent(s)
          may access the personal information that you provided to us in any effort to collect any
          Charges or Costs and may use the address provided by you in your Subscription application
          or in any Subscriber profile, as the place to send any demands or collection notices. In
          the event that you presented a credit card or debit card for payment, you understand that
          we may report such deficiency to an appropriate credit reporting agency and you also
          authorize us to share that credit and debit card information with third party collection
          agents and further authorize us or our collection agents to charge any amounts due to us
          including, but not limited to, the Charges and Costs referenced above, to that credit or
          debit card.
        </li>
      </ul>
      <br />
      <h4> 1. 6. Subscription Cancellation Policy and Termination by subscriberName</h4>
      <br /> <h4>Trial Subscription Cancellation if applicable.</h4> <br />
      <p>
        If a promotional trial period is offered and you select a limited-time period Trial
        Subscription (“Trial Subscription”), you have the option to cancel your Trial Subscription
        by providing written notice to subscriberName via <strong><strong>#merchant</strong></strong>’s website within the first
        initial trial period after the date on which you sign the subscriberName Terms and
        Conditions. Subscription cancellation will take effect immediately upon receipt. However,
        any fees previously paid during the initial trial period are non- refundable. If you do not
        cancel your Trial Subscription by the end of the initial trial period, your Trial
        Subscription will automatically convert to a “Full Subscription”, and you will pay the Dues
        (or at your election, the Annual Dues) applicable to your Subscription tier choice through
        an automatic payment plan set up during Subscription on-boarding, for the period of time
        applicable to your Subscription Tier choice (the “Initial Term”). The payment of the Monthly
        Dues will continue until the Services are canceled by you in accordance with <strong><strong>#merchant</strong></strong>’s
        cancellation policy or terminated by us in accordance with the subscription terms and
        conditions. You may cancel a Full Subscription at any time by providing written notice to
        <strong><strong>#merchant</strong></strong> via <strong><strong>#merchant</strong></strong> ’. Your Subscription cancellation will take effect on the
        first day following the end of your Initial Term (“Cancellation Date”), and subscriberName
        will stop charging the Monthly Dues on the Cancellation Date.
      </p>
      <br />
      <p>
        After Subscription Activation, Initiations Fees, if any paid, are non-refundable. If you do
        not cancel your Subscription as set forth above, the Subscription Terms of Service will
        automatically renew on a month-to-month basis (each an “Additional Term”)
      </p>
      <br /> <h4>Termination by <strong><strong>#merchant</strong></strong></h4> <br />
      <p>
        <strong><strong>#merchant</strong></strong> has the right to terminate your Subscription if you violate, directly
        orindirectly, the Code of Conduct or otherwise materially breach the Subscription Terms of
        Service, as determined by <strong><strong>#merchant</strong></strong> in its sole discretion (a “Violation Termination”).
        In the event of a Violation Termination, you will be responsible for all fees that were
        incurred and owing to <strong><strong>#merchant</strong></strong> under the Subscription Terms of Service (or any other
        agreement between you and <strong><strong>#merchant</strong></strong>) as of the Termination Date. You will not be charged
        for or required to pay Dues for any months remaining in the Initial Term or the then-current
        Additional Term after the Termination Date (the “Remaining Months”).
      </p>
      <br /> <h5>General Terms</h5> <br /> <h5>1.1. Disclaimers</h5> <br />
      <p>
        IF YOU CHOOSE TO USE THE SERVICES, YOU DO SO AT YOUR SOLE RISK. THE SERVICES ARE PROVIDED
        “AS IS,” WITHOUT ANY IMPLIED WARRANTY OF ANY KIND. WITHOUT LIMITING THE FOREGOING,
        <strong><strong>#merchant</strong></strong> EXPLICITLY DISCLAIMS ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
        PARTICULAR PURPOSE, OR NON- INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF
        DEALING OR USAGE OF TRADE. <strong><strong>#merchant</strong></strong> MAKES NO WARRANTY THAT THE SERVICES, INCLUDING, BUT
        NOT LIMITED TO, THE PRODUCT/SERVICES WILL MEET YOUR REQUIREMENTS OR BE AVAILABLE ON AN
        UNINTERRUPTED, SECURE, OR ERROR-FREE BASIS. <strong><strong>#merchant</strong></strong> MAKES NO WARRANTY REGARDING THE
        QUALITY OF THE PRODUCT, THE SERVICES, OR CONTENT OR THE ACCURACY, TIMELINESS, COMPLETENESS,
        OR RELIABILITY OF ANY CONTENT OBTAINED THROUGH THE SERVICES.
      </p>
      <br />
      <p>
        NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED FROM <strong><strong>#merchant</strong></strong> OR THROUGH
        THE SERVICES OR CONTENT, WILL CREATE ANY WARRANTY NOT EXPRESSLY MADE HEREIN.
      </p>
      <br />
      <p>
        YOU ARE SOLELY RESPONSIBLE FOR ALL OF YOUR COMMUNICATIONS AND INTERACTIONS WITH OTHER USERS
        OF THE SERVICES AND WITH OTHER PERSONS WITH WHOM YOU COMMUNICATE OR INTERACT.
      </p>
      <br /> <h5> 3.13. Survival</h5> <br />
      <p>
        Sections of these Subscriber Terms which, by their terms, are intended to survive
        thetermination of Subscriber’s Subscription with Route Line or these Subscriber Terms shall
        survive indefinitely.
      </p>
      <br />
      <h5>3.14. General</h5> <br />
      <p>
        The failure of <strong><strong>#merchant</strong></strong> to enforce any right or provision of these Subscriber Terms
        will not constitute a waiver of future enforcement of that right or provision. The waiver of
        any such right or provision will be effective only if in writing and signed by a duly
        authorized representative of <strong><strong>#merchant</strong></strong>. Except as expressly set forth in these
        Subscriber Terms, the exercise by either party of any of its remedies under these Subscriber
        Terms will be without prejudice to its other remedies under these Subscriber Terms or
        otherwise. If for any reason an arbitrator or a court of competent jurisdiction finds any
        provision of these Subscriber Terms invalid or unenforceable, that provision will be
        enforced to the maximum extent permissible and the other provisions of these Subscriber
        Terms will remain in full force and effect.
      </p>
      <br />
      <h5>3.15. Contacting <strong><strong>#merchant</strong></strong></h5> <br />
      <p>
        If you have any questions about these Subscription Terms of Service of Service, please
        contact <strong><strong>#merchant</strong></strong> Support at <strong><strong>#merchant</strong></strong>’s website.
      </p>
      <br />
      <p>
        By initialing below, I acknowledge that I have read, understand, and agree to these
        Subscription Terms of Service, and all of the policies and procedures outlined above.
      </p>
      <br /> <p>Subscriber information::</p>
       <br /> <p>Name : <strong><strong>#merchant</strong></strong></p>
       <br />
       <p>Customer Name : #customer</p>
       <br />
       <p>Plan Name: #plan</p>
       <br />
       <p>Address : #address</p>
       <br />
       <p>Email: #email</p>
       <br />
       <p>Phone : #phone</p>
       <br />
       <p>Signature: <img style="width:300px, height:150px" src="#signature" alt="Signature" /></p>
       <br />
      <p>Trial : #trial </p>
      <br />
      <p>Initiation Amount: #initiation </p>
      <br />
    </div>
`
