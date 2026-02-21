import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-12">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Prayers */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold border-b border-green-700 pb-2 text-yellow-400">গুরুত্বপূর্ণ দোয়া</h4>
            <div>
              <p className="text-sm font-bold text-green-300">ইফতারের দোয়া:</p>
              <p className="text-lg italic">আল্লাহুম্মা লাকা সুমতু ওয়া আলা রিজকিকা আফতারতু।</p>
            </div>
            <div>
              <p className="text-sm font-bold text-green-300">সাহরীর নিয়ত:</p>
              <p className="text-md">
                নাওয়াইতু আন আসুমা গাদাম মিন শাহরি রামাদানোল মুবারাকি ফারদাল্লাকা ইয়া আল্লাহু ফাতাকাব্বাল মিন্নি
                ইন্নাকা আনতাস সামিউল আলিম।
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold border-b border-green-700 pb-2 text-yellow-400">জরুরি তথ্য</h4>
            <ul className="space-y-2 text-green-100">
              <li className="flex items-center gap-2">
                <i className="fas fa-check-circle text-yellow-500" /> ১ রমজান চাঁদ দেখার উপর নির্ভরশীল।
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-check-circle text-yellow-500" /> সেহরি ও ইফতারের সময়সূচি ইসলামিক ফাউন্ডেশন
                বাংলাদেশের ক্যালেন্ডার অনুযায়ী সাজানো হয়েছে। তবে স্থানীয় মসজিদের আজান ও সময় অনুসরণ করাই উত্তম। সেহরির
                শেষ সময় সতর্কতামূলকভাবে সুবহে সাদিকের ৩ মিনিট আগে ধরা হয়েছে।
              </li>
            </ul>
          </div>

          {/* Share */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold border-b border-green-700 pb-2 text-yellow-400">প্রচার করুন</h4>
            <p className="text-green-200">
              ধর্মীয় কাজে প্রযুক্তির সঠিক ব্যবহারে আমরা অঙ্গীকারাবদ্ধ। ক্যালেন্ডারটি ভালো লাগলে শেয়ার করুন।
            </p>
          </div>
        </div>

        <div className="border-t border-green-800 mt-10 pt-6 text-center text-sm text-green-400">
          <div className="mt-4 space-y-1 text-green-300 text-xs sm:text-sm">
            <p>
              <span className="font-semibold text-green-200">Initial Design:</span>{" "}
              <a
                href="https://github.com/kazimmt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline"
              >
                Kazi Tuhin
              </a>
            </p>

            <p>
              <span className="font-semibold text-green-200">Feature Enhancements:</span>{" "}
              <a
                href="https://github.com/SajjadHossainSoykot"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline"
              >
                Sajjad Hossain Soykot
              </a>
            </p>
            <p>
              © ২০২৬ মাহে রমজান ক্যালেন্ডার | সর্বস্বত্ব সংরক্ষিত
            </p>

            <p className="mt-1">
              Developed with <i className="fas fa-heart text-red-500 mx-1" /> for the Muslim Ummah
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
