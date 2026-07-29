// TỆP TỰ SINH — ĐỪNG SỬA TAY.
// Nội dung thư đã được MÃ HÓA. Sửa thư ở data/letters.source.js rồi chạy:
//   node build/encrypt.mjs

export const CONFIG = {
  "teacher": "Nguyễn Thị Thu Trang",
  "pageTitle": "Bubble Card",
  "eyebrow": "LỜI TRI ÂN",
  "greetingTitle": "Gửi cô\nNguyễn Thị Thu Trang",
  "greetingSubtitle": "Những lời nhắn nhỏ từ 20 đứa học trò của lab — gửi tới cô, người đã đồng hành cùng chúng em suốt chặng đường đồ án tốt nghiệp.",
  "openButton": "Mở những lời nhắn 💌",
  "finaleTitle": "Cảm ơn cô ạ! 💛",
  "finaleMessage": "Cô đã đọc hết những lời nhắn của chúng em rồi đó ạ. Cảm ơn cô vì tất cả sự tận tâm, kiên nhẫn và tin tưởng cô đã dành cho chúng em. Kính chúc cô thật nhiều sức khỏe, niềm vui và luôn rực rỡ như hôm nay!",
  "crypto": {
    "salt": "70faMGSQfhEHeFmdfVnexQ==",
    "iterations": 250000,
    "verifier": "6niBqW9ox26PJjNyOeUOJnpz6XXTu4njRRJf+jZN6AeKJeWcEuVhYN4U"
  }
};

export const LETTERS = [
  {
    "name": "Minh Anh",
    "enc": "E0F8CrcLbSHlFdjlW2j66qt1fimcGI6K9+BQ68JDt4eCDfvbqvU9N2NDN4rgDn1QDTgGgVFEVtkFrRou9uBWEGreJMoMtM9MSAUhJVioISNVFGd/r2NXF1Ad4S0jTvjJZe8pbMiTxpaZSyOU+Q2xdgVzh2xEuq2seNADJvGFo+domq2+DQ09oDS7jUzH/pi2OUtw8xLlqbz+hVPVWMOH1+cS+Tv5/xexrormve1zoMd3ZaNZ9Ll1thaTipyeCBwENKeomAQ7komxICtHynR7P4VGQYQQl4IOfFPgC+FbrQn3Xt3dinzXYSbGZ2xWgePF6FXlZhF7lmITAScuzmoeBn69gYVNw6a5kQ4m7ItkHW2mQaPBm8Wh8dL6sRD3XupOmdQTVrtWHKixdqLbXJpxtjp41tZ/l1G70Iy8y1VdGMXPFFFv3krIf5g+CtfzgzoWa4wd0e5wAMzAM5MtvnjUnADrrrZ3NHVBdNcGQRzwlFQQqKOlwl1ax5jhLepXpW2BEYKMiNz4hZWSGangdWvkHHcPBDBkHg=="
  },
  {
    "name": "Quốc Huy",
    "enc": "Ejc2N8wkCb4X81sEGAbI0kjUR1V8SsjYwce5MNthgOijMMsdSto21hSkW16l9GEQq8H/tlU69Qp5bxqBhUxSq1VHg69/7K+RCvdSAKtXv/YM6ag4DpH519YW+OCgtivdc/yVJBSfDcoUOk0Nzc40GrpIhQTD5c4WwMPJMjlQ2h23U2RYms2rxZt3SNiBnGBKB1JRaW4Jtp7+ic2Uyl7MTu/JMoRRqwuzZuv/1WXdSFn5Y2cAOLCO83xwzqNRO5WHKzARV2MMPX589pe3nBLbJouHzSdnMMv2+O3ma0LWl3RWQqb00WpZSgWrypOfKORprsTWcGx6Y4gu8veKxSrfhmFJz9axZbUHCCuCbcMpvQuhn051dLpM2tnhhbP1xbTld3mIh1kO1XDMy4gXYQZH"
  },
  {
    "name": "",
    "enc": "Vi+r/GvV7f8lhhx8rDR8cKntBvitixSDDo78IzY06ODFLZbR1zo52g8m8LlXZiOkvluE4GzSiz/JQBPCACX7zR+U14us3PHgHqlEdpW1zinFXNNOJ5xXQKNw2/fzKe83xm2VJCkrHEQdnTK29u6GJSJXR8tofn27TvItqiLMO0qH3/tIeYeH0fjqSbsEDjtOezNQTdIVBW8u5V9nprH1wY0rf3Ma6D0qBqVe62kQyeCxu1e79QqEMZ/TaWIAwFzSmbk3BK/ig0Ofy1r7y+ri+xJVzLnwOo8FU6+2cw1g+AvvQ8cq7TX0IY+duOO9Z//pwKkFHjl1yY1NzugtUw1KfW0uz9ojA78PVCrRhUkGyAtPQnyGbvf8GHYIya803Lt96dceVE6zm2dZj25OQvDWL4RkAxo="
  },
  {
    "name": "Thảo Vy",
    "enc": "61U1j7HYjrl8JtwwMvhCwlil6Ijgcq9uzIOYNRCoy5HRpkTDyqg1qyHhpE4mJp9mhmUdNKbG0DVIwTF3OzycxeUt3N2kG/sSmoh3HiqM1dr1zBrO448Fsu8hGEjGfR82W3JGsckiYotYWgJzgb2J8Tqb02vCpbxaoYwss9aC/8Aag7APb6BSGo0zFABT2AS5fBCVs0Tdg/Q1Jbufm/ZOJnina/x9pZv41pqKAVdrWRzAx3TbW4h9gQdTuKfm5dStB1svjrABPLrCdnYUGsgewQlZS8+1mJg9RgnzO8pSu+6T+1mp2/v9FKdgamh5gXZEXbZgAARJ23ivHQ5mqWICaiAWCPdzs9+0rxrbL13T4R45olG/vHNUeQq3AqdhzY45vf7QheDy7mWl4XECyNDWmGx3GP6e/9a/MqqUSg=="
  },
  {
    "name": "Đức Anh",
    "enc": "EXYeT7sfWV3cFxaDLOOx3z1GjwBVEm6EJBT4X94DCZjkgn3/iTOvNCOGfBu0gwJ7crYbV+/P7dKYgXTREucvjzCmOqZyZ8NXKrsGcYDxM8msJru4ARNZgITZyWs0K/grPWTOGbgioIJziMI9QU4CCvNdMbjulVh5P0LpBTwnfHW5ERJcY0+Q589yRcz+yoHjHjyteGa6Bv86soaqCW1wYQMiPuxdKlEJKZjTnQBRx2YorQfrDvXOetayvLNjSuIJdlogf9q9nKYTc2UJcQR1Yi+J"
  },
  {
    "name": "Hương Giang",
    "enc": "xR5BxanPcxSiFjo1NUDymTcUjhy3y+3Yx8dTQiwUC8T1LCcbtI1caaxUWXYozyol39Xp5JkntJn1A26rRFnFTEA2i0MnJdb+I4kHcZpeUfIhHHxz1gEYlvhdE4UKTmYOJpHUHpw6ykAh/30dbvjKLkepEKwsvFBzArUlwGyU2BlZBVBfydAtZzoigoDj5Su6EMsunfT/ZA81ezZUTEwAYJNqKvvRgS20Fgr/BI00CyDpursDcxIjWmfKVDS5c35PB+6vwf6quGsFctTfMXOsrYGIaJ78iYepoVz6xs4SK7obHnZXMjSPMuTRe4POgBnAcehqNPyFgNoz70fUAn0+mBDtZlropGweUju+C5VGYToNUbPcn8DAplSuUfdcHUYbevvSwmBkfLn6RSGs7MXUNSfeA3PtAbmLcnKM6nIpSoNCOHRwjZyVqTpcnZXJWUQBfZJ0zjd352eIfpqUS9tqsoBoTrsAmZ6z5mX6OpZyCzsI7NjaxP9thil3YIXNq+oi4jJVXk7vA4/rF2JS2e/sk7AW"
  },
  {
    "name": "Tuấn Kiệt",
    "enc": "co9CLbdpgn4m4N8dRq9mw/vvi84ixq5sFJV8Cho23HB9jX3JSRlsgLSRozBFG3tf6P3VVFuz1wcyxNsfOts1YzZqbDfNdra5Q8bZtTBjaVygpC/QJcQnNOy8MYxyUHRUJmshzNpU6Ta+GunufehMgbPq862C7Sq9neqHGK87rCauGkPvPp9VES8K882XcU7FIbSfNvxJ0mOI/4YJPNodTDgDnqcudMJJR5IwjjfY1UpkSRAK54V73K6vrMdCr6u2W3zGHUwSMtRUYSGlF7PlN1fnoFnUO030TbDMI/IGklJiDuXT8N3sPp5JLMHbBlCBZFVHY9M3QSVOKcKNBm/8MX7LnsnlkOTuT+UOKfVc2S6BjvzIY0dDlW1oULGXeqV9gkXHvz5rfnUXLCB/j6YPLfjyZUSFK13gajsKq/mZIs/wK2SC6r1YWCF9ajFdzlcB9M6tWxCjS7QfvwVjr1Ob297FtXWWZoS925Y="
  },
  {
    "name": "Ngọc Ánh",
    "enc": "HzWaj+pqfgmVFMkhZB1fKcf1UyGfYkf+iQdCyw2NXZV0Gy5zEbL3Xt9BLd7QL8zUnNlFGZC28C8bWwwucf7rYUqpJ1N1foFxClpUwZZet1AGpoDKuBqrVyZyCvoPGM8IlvOvO+/TJdwJqRQXF1hrpYcVRTZy93ZIHCjvWGfXXj6XESuLC8jRt6lEl8OF7j3OBcKQPaDyxiqT2AHqNCfYG14DN3KhSaArWSyBS3OtrPdtG8I4HFX2gitf/IeSz+MwwX+xGNHNb+SmhJ/LB+gA/nrYlI3e3cYDIOHps/iHP6aUYp3IL5bwnIded4HYsc09CbA7m2muNqYP6kv/"
  },
  {
    "name": "Bá Long",
    "enc": "0hsBSWzTmHm1G++AS3UPGs62gxVtrhjffaOFlsaKUcHLMGM/1PhRLMMRqRaaQ7bN68ZzsCSXp/+CwmvM/X6JVQP3wL/effcf9p0+4eHf1qEa90PRJ6a4QySKzbyigqf0fLWiRFzSsF8MY+UMtumvKJOBn1oRLDvK+R54kmHl2DktdCaf8nToOYMX8DI/jWuOPpkQO782sm+OjOCe9aJX4bL6Xh6opXHPX0Bm7w991XyW1lGMBBDpNq2nfkx227ldEm4cjZ7US9zKMasYfR57w7H+GGYZZzm/Xnr1VMDIs1/m8vTEHD5rMF74+/yMZ+fngrsM9nihpJhjbFGGX0+RzZLxUFLY"
  },
  {
    "name": "Phương Linh",
    "enc": "kT9p31iU7UMVuXbInUF0J9FHO/WV3kYu+Kf0R8kHXuoSwFxomPYL35cGyWimozbto4loTNzYJPLtC2PhyylPH4p0h2W+z9G0hJnYJu10UOD296KkNLcTgTuMfKZgaJUrmTXIlMsomTz2yRKP1hWbLVFppZWJDHZOfAvILv8/HzkotDbK+wMrzROgFYQOcIsgrlbIFY+KgBydwKvFHJGHLPglg8CKO5WjqZqCngdss2usBnZfRGhKxTsfWbcx2mkASFrZgtQn4QpV2QqTFT2RkBZMhetk++VO1NEcBpqTBjHh2CwMScwccAa5a2AvMlibnDf0CP5+w8ba3EA51HdnYvDzGr9hVRMTHWdW0CjAhFFgT5APBTO/JQuVB9p7kchCDdy+3xS1Zmo4zH3i2V15s0BSMRQD/wyhtmU4MLPCjEBLrT6rNNjqT8qdhkK43MVwJ9mZmre44P4IYauLKDotVVaIg4QHcT3s8JsT0V7ifEa26NrpRbYgv3FGK/fr+aUYHxTwj/PreaT4LUBt6NDw"
  },
  {
    "name": "Gia Bảo",
    "enc": "tBaIQoO7mmbROyvApiH6jhgnszU1eDIZZR3QQ0zgc/Env2jt8R6Itbl1/QQnG7oTnprgv1MJ4ckYXk0sFzGIT00o/urdtrGfrarNPULJfXt0+V/X0tCxQ98zfvVnLw/RI+9Cw6EBs3u9KNGQ9oRr7pf+pWtOrCIOLdgPR/NPh1YIszLXH1Tz8zH+SPjMTpnjEi3EWZ3Q3Jb+AHD+1SKq3n04DoEfMEFjVATIIPEJ6yEpSI8KS0+qF1wJxl15k0W5OLnsy2I7QdzhAdjKgxivn7iZATxxjRSZNsfGae4QoGhjhEtw2NlisfHQ32BT4dUrGUM="
  },
  {
    "name": "Khánh Huyền",
    "enc": "inhFfCtW7YEdsjvCl6KHYz8NpMcdi5KgRADceU9gMN7y7/rR+nos/Bs1C8Ku8RaWiEOSO5zxnj1wmF8Gr/pq972PdPilzIxi8VQylQ5Ikk5jUtZQ5+R7Sy64pyOg/zFV+d8HIqeXeYfAQrop3cTc0FbvAYrwOPUJTBfC/ERTCkDlVnb3XWBkesgtYCCpg1gy0JjNQMsyV9IzqKwF4ON56jPNJSWECoQjTHZ/G8Hz6HuHIwUnbkNE7bLNILoKvjysaZwHLCA6YfjUNSohA9Q9JjwmQ/6bxsoF68IgPrvJKAMnOmwVSBv84g5zDdQ7Gav6FIN7p7mb4HXgmNPRKh/xSZZ3mtj0xBDOy1S+9ntij703E9Y//EhXQioXKvDwpVpJvDLw"
  },
  {
    "name": "Trọng Nghĩa",
    "enc": "6VYsMkdeViHM/M1a4RMbMoFitVRwEXobCRWZPwR6MiG+5xZV7ZX0BAhLQe+Iexja6OZoMNah1SI9k/9rKF1AQYRc2z2Tq6W/SWf7pcEW8LZMbaP4NkK4sXw7hVSuPRQQ215K80aj6H8ZRs5LX8dHrQfNoZxC0AMw4/K/IwbhdDvciujX+kPIykAWS5DcDYV6Ys4Q06sl3q6WY96e6/0HT6lPzAz/t3phmFkMMpNyVTbzncKpWa5E/SATWlXFr9m7AB/KITQCthfV8tQfUtp94MxKQXobg+a9v78ke2iWFSBXvOTGHFB1tLZtE9EFVwTABPK7P608/smSakDlGyBv"
  },
  {
    "name": "Mai Chi",
    "enc": "1bVz6juNdVBmDI2uFMrYZgD5njKJs76JWyA2CyH/tptcNigNYeSj2YqHOaeDcHLTth6qJmJVcobE+chGFhlrmtK2Lq9XeszQWUOhJxFywGUD4HUPZ9c0BT0jb0/ai64GCHGJ4Ou5UsCclu1S5W2sU+E2ttCncJnmmEC0MHRmcRxun1R5B07/MaRzReujfEsNEXmNXWzkOBjLtAv5XEuz6ZquJXTcHSTl0E9FEbPjfC8/3rOtl+iCuKhyEtbZggBXyurLlXTTKLaWv2v51WcPaUjqqwkpKWK0YJ9+3jtKncyrT2KIWeuaRKg/E3seb9qH45i5xPg2gMhN5ov9CcXEIPtYdiQnJX2rpRxuO2uTbRhJ69wbyRvET+JfofxlkvZLPeJk"
  },
  {
    "name": "Việt Hoàng",
    "enc": "sR9uJh5mh8RfeKNcGsmf0fIGnCiqoAMzsUSCkhU+fRlDhcazROSbMKElok45bZSK/dXCQ2j5qtzP3LP0lIRyH67D5+Ds3Njei9zZFW19Y3Mhe/ehuSv56ZepGNQ1y41vmtJ5SYMSYx1ycgMJNyyemwjDPF0Q3SUQyocms/iJFogc3MvAxcHtfcmC/9DEQfv9SZWwSbxskJ/LPgK/FS4Ey3OcG5GVG0dhVqudk0ram8KKZv3ZLerE2xhdQjdbh0h/gRDYWADnfhAjnik4UwSu8EilsHZUmah4Axae+rxWwp81cE8J77lK5/dygJ6DR7IswuD2AWEOt3d6iVMCiYIy4eRoar0HlqVaBfwXy6WNPpiLfWtb+uQTZHY6gK12+pbakeLHEhso++UcfqVy7gistGBP2lPWDl3WuT+tK9K0IcXV/9qyJP+FP3I/dmedSYg3yqk6e/I3c2P3bt6HMrARsSSljgUgI/SRL/qEtTQ57dtrMhqEfFMS5gXWgMl6TAHivRLqxGQvNeoZ9uaQG5Xbo2jgjboQHmGPhWLqfw=="
  },
  {
    "name": "Diễm Quỳnh",
    "enc": "k8DaSrgxRsrmzf3KnQmzSemKmZQbGM1Nf5nEq2zkv5FceNgXyCaR8yVVJDV1yIGLlGBhISW6trEYwUR21RRYmwxOWaDdqJVAsNyFXEgtrhoPtMTVW3VaLCSZmbM/qxArP3aWOP5nhwJSFZj8mUWOr1Z2qgQaOsZSoUB4VjY2Ym6/WDti2R7n+8qg08Ry56TPw25YBwZKYR1pSwUK5WzLcy7AXn6QoOAF8fqVbYgLa6Q+fei+TnkkkN7TaX+w6FML1aSH5Q4aiK098SR1H5izFeePpVDljdpUQDV15Y3s/vU7uksA5IC7HQsjhox7uBlakWvm5tafoYchvI228k276WwRn/ieQwFbAikYiw96YJeknlfqDpykc7zk9GP2mO98n/nNnud/xJbp6A=="
  },
  {
    "name": "Anh Tú",
    "enc": "c07ZSwINjDZXgTAtxI4CJUZ0P0nSLUOpuR526t3HU8MmW0LUTvsFDmWLjQy2xgEMH/OeQytnKEX5VBhMv/3SbJCcO2EZT+V+JlZ5vlKpjED3/qnwQyLjmtV8kUzGRdABePrqw3rnn7VXn4kOX9i3OZsko4KJHeclTyT24jkPDaRo2Zd7iSR6JR7llbz9m3+gfImSLNm7rSms43k445OWEzjPvyDwFUACPeOdhdYfvBF8sBfiO5Lv5L8tXAklDiXnTdNtHbwWg62gPvreFsY0TCtgFZ9+2rc+Ea1ir3tdEivwsd87SlbIVRh1SxF/ObWmznPiOBorEwg15YYTpk3T3sr15Q1qxfbpc9qku+EGvqaDN3sZkRw/viKK7iwf"
  },
  {
    "name": "",
    "enc": "JXWo4P6WB7CP9njLid+XTijK5Hy6JfS/8i0hR19T2awCxiC4L2Dep5kjF9uvEWdoZC5pidx4dsqwgajcVnSK4HUBeNExiBJA49yNR85iZUOFz0PNheew9psS4eqxouSuj4aW+G86LBMrjCvRvCUEsq+wUlg4BqfG4pWoYNm7H6cdH742RPuD/B41hDwVqNV5JkEy+Kun3aMCLdM8VNwB/qxZciwyxSOakGT8BxLBOTaSljYlm1eO/GFoK38UUpERtsF8tNIHKSsfTDUA2aMjLW1L50W6QWch7uK4dkPDyjlVELZiOJdL8EpG8PwnCogiFk/yHqm+IWSlMk0PDGQQWDDI26aG5OXnI+0OlBRH4ly42IrfZbm0Hk1HbutbpQJcKPTvPTPzC0g7q7yJFQWYSQT7FnC5mGvWNyJivnlAWQyvY0t8jyRFuGXUxr5kS8f33ebzzvLA/DKUoLFrZ39vYEJ4/Q=="
  },
  {
    "name": "Hoàng Yến",
    "enc": "Lh3QWwy/tmdOOqNQXounocyOFlbSdGdjq18RXpPV5fBBbDQt1Ocqt2ifY0BssmmlnhMwwIv4/i8I9vAc42SAPGVOvBz7dhsWP0D/JL6WeujBszyrxST0LRy7eUGSAgfF7vt7wXoDdZ+dulFKvUIsN9mmdTn56/WUDXWidIgZATMQej0C/KawjF7nOHv65Y+OwchlJeHa8AuHZseWcgqfDf3oiS9AJl+VT14qZ+uTotnaynGLSvl+3yxkUcmWu8Vwu1lkncZXddNnxM8geX4LpDl6nbtUcN4jPkLbFp5TMznf3VYTP5pVNf/a79ofJIaGBV1pGwpm1dlz6cl9O/ZnmZ7PRYH1La1evYXpJNElkn81FJKwnSzQ/9wL10cheZO2Wc9IDP+1YDTOCYcW17OoPsz7hJzF0wLuv0IPP7J69N4yCZXsfUl9G/njkTqZXTLzMpYLTbpmujPrAA=="
  },
  {
    "name": "Nam Phong",
    "enc": "2TCy+1M7xXirmSSUirg27Um8vMloMUtdfz/u0HGC64NCtlnUkcRWFza0GukLbrpPjTanQkAu6dBhQFp+eGeqavNZxvvScAAFDW4FBWM3cv/JM9V+NHO5pKB14MpsPRiojTvsehbs4GZ95I9wkA97aoeE7BrDx4b/vyjVB5rRPAcF/dEgv0H9g9cxWsknUSk/VaQAh/X9D80aVtgXNPIhneNzsgGkARfewgd24kMimyfUva43ur4lrTl8espFC8mRltHCDBwKxHSIGozUFCp28IvMtLNA37u39Wp6Wvq2uqGJF39rFIx8cEpHigQKPot5sYjRZTG3qHvL1Y1DEZhb1V2gF0z7/VLA1E+TLNcYy1Wz3vJr9nuJx7DRnFE/3K6UkJYpqOXhGHEpbKnWGWz6F3F5wbXA9B1ojbZNUniyair4S/Eco1sXDXIqJppwPV530TRoq9utwvX/QGqF"
  }
];
