export const Sound = {
  context: new window.AudioContext(),
  laser() {
    const base64 =
      "//uQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAApAAAh/wAgIDk5UFBQYGBwcHCAgIyMjJSUmJicnJyfn6KioqWlqamprKyvr6+ysrW1ubm5vLy/v7/CwsbGxsnJzMzPz8/S0tbW1tnZ3Nzc39/j4+Pm5unp7Ozs7+/z8/P29vn5+fz8//8AAAAoTEFNRTMuMTAwBKUAAAAALLAAADUgJANgTQABuAAAIf8R27UbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//vgRAAAAetFUn0EQAhNCbpNoJwBJlIRU/mcgATGwiq/MYAAAAhgB1gB8BAAPwKD4EZCanf/9+QmQn//////nzv1P/ITIRv//6EIygAATghE4fLn+D77lOieD71OKHIng+BrLY678BAAPgAoFyAphnmNMbPf/Qxpjf/////++p575jfQwxlGhAz8zU/zzz44NAeEB8BgOCCnnnv6nnk3MG43HAh/5c/IQQcXD4jD7OBgCEjI6KK0llbgAAAAADMFYHfOPvYgGjaQCZgKVEYJb0uurGNFO8TdNNaCsPDSZ6Yboz7j3EOTjPIsmQ5RSjqu+FEjMIInmVUrWned5gl7v16OLVattwXrluVNbgSv3VJZZzFM8LT+ujFattu//+GUYlmuZT2NpK77ut8mgARKpyNwdG+rHceflkiaW2JZ8OtYRPXUXzsyBpGSRwkI+Sz06BkMFLg5R64HdNp8oSvlQQIGUDMRkKs8LurAjzYjKbcahb8aoMUsSlHk4KRlTjIEVNFC34h+Ny+EUDuPM7krjL9xhY7XwwmI32YvxBaPjwOQlY7HXjUVLcLzmIGWEcFqUmVpbe4xWfsqoR+Ltcov////////////////CghAPTf///////////////+uItPaswgoIIxAaiIvZSVqAAAAAALwGA04rPYiAnX1FAwiC4xyctWOd2BG0N3lnXDdRt1vNQYO0zhfB97SzolWhyRSll6LClAVC1eSy6OWmWRTO9XZdTY413Vf2xEqa3OU/aliKOzEMsG7UznQzNZv//O6mJa/eHe2sp4kZzVre48KUTEeVibHV3yO2+kUcGXPW/FogKgsjqooHLoJK9kfX0IDqxLxgcVCArkWC2b5oA2FF0Gr3hgCK6KxYKXuCCgQJrnIAQUeSodDKewmwaMzJ3SWrd0imhZx+RRSSv3ch5nE7HYW1xobsIGtdcYYennH2fKNMKVy5FI19haEyA3vi5UO679LxXg4T6N7G6rIGiSBlksw////////////////cAt2zqQf///////////////xhr2F5fgjUzdyS3TAAAt4f7kOonzKRZYUEP4fouZ5PtNCMVhIJaRMc+ThuWLMv4hFjnNuOFHmxvML3x/8Q2ZWalsZHP0jZ1i3///83aQCwA5set8w10LtuJNWWsuHpE2MB2G0SVGg0lCZIIcXAPpssIAax33BcmTx3mB0EgsOjuaTcmmaY3XNT7KYSAQiF4axtqb6TZaG66P/EW7cRJgjmxuPZaSThZK0J+wIgZ1ErMmAAD6wPrQsoy7tts7ztxXNKnNcmu4z/Nff+ztjgaz25a1TXnn/vbe9a1bGLVgY1vGMb///xrN//////7Y+P9f///7v/IiIEu83+sQb4tbHhPYfy7co//vQZICBBSZq2X89YACmjSr/7LwAUmGnZ+ep9YpJtK288LLcNFQuYkBHXfMqHqeGTw7RckChl0Lq+x47HDVaqIG/VrFKotxoVMPNY8DW9zt21TFl39WzLPFbKd7SeJfedfGMfWN7nbaL7KpnKEQ+iIyeWNrc4bxOmYoUgtkoTxJTZeFzLRWo1eVh+trHh9it21Cpt2q1ELFXNVipsjQeO6tmv+pzHqjfqlmv//qaE0lJ39WVUQ5nUlIoi2qeHuSJR4pqryMfMSrgn2Uj/tEaL4Oq1XrMczUy2W65idSQrf7+tUustf1jUuYGpfAzqLuakLNf8ffq1QYMZrs1wJ3Brsm+5dzm3V/NHwAEUHEW4nRdkGhhKRaxIZTpII5KaKoWKG+pPnVXqCr90jYr9SeWcxI0f+yJAz/4PSBy2ZORWa3SqVVL47GWTuff9rMETrvQUdSjgsb8kt6WEM5SHC1DVCwUHsNFbx55o286SGypGVj14srm6zlfylpteYB6LfTM/+9st7zrsX5M9uTPz078FUtXHrr8EDA2QXiaYAAJirT0Q0+DyN9vB4gpkgh5WYncIrE8fRnec4XSXUbyPtpkNFXO02YeTZv9UQ1EQ3+x7Vf//wgHXJrN9Y8sS99eK8kmhdKRpEik5a5W15EqtofskI1T9HqYYxNGGLtttA5cYpbnNrTWFmGrUblnmg7kf7pTRmI9XOWIdIPfvmq0GXzxnUSJPnfti+O1KtcyL9W9ya0pCszFv52UUZiT6gwAAupMDGN0olUSEwBriZJM0SIrLPMu4U72F/4BJJ7HzRdJSKSFa3NLGNbf9f//p+5kZsprInlrOqOCyANJJ81TTc1MVJnzsyl8yLZgWi6hJ+maT1saW81nz9wZC7K86RVAqXMpy/HalD+Uy0uW9cBovAct1eTS5YoCrVMeVZll1eLfE0pwJj6+YtaXtMxQaR3Fxtr61u39fmJLRFP1yn0gj4VX0KQju5Ir2200G4kaYWjCM0QBGHMX0lrqAn1KyQc6bN+qJTed/XUrHZVNQSBRYjlVP+5ilmM/8RKrf/9RgDAULJ70D1ts6z0HsrVnVw6JYknJBRUxkah3MTgyR1KRqIY2OgaqSf/7wGTXgQUCalf5531Sqm0rHz5PnxMRo2PnlZVqcjQrvPO+PTEmWnp0PQySqiqtOjJ8xqhiLbqtWeg1adjqutm9aa1tNum1sXUVTPTk/dIWlq1a7AuJK0VsoagSoKeWsAAWjNrQioymKIMINSnVKdMWymjV3fdeKASd7Ho7Kc2dOnTmmr0R3NZTzmOof/ZCrI/9W+ccBIAKSuZpIU+3r37rrDEolefrFBLyc0q5ip5PKF7BY4Z0qh8eoBsOKIrYpOVDCJ1MhxbiVEmJVESMJ6rVTte9s+sHMlrbotN8XWvCxaFV69/+t5366//+a6/hRtLlPRSdy0dTdGI7vKAANvEKHgZxagox6Vk50aYJWv6RNwrS1ib9l0a19f0erIjuIYpGIzEctk0flZHUd/QyIxlb//QpQHhIPT076zrXNPJrNSPli8GDyUxMljaVAimh8sFEbwIRCPkOVPOLQSnoFBPcSTjoQTJ5SpUf8w9A+SVuPuIm5uWOiYv//4M2smjaBSuaysjs4BL62ABjBddHsjy+m8rj1Yh9iAn28bc/E9fzP/lqlzvjBBKGe39rrV/9ZW6/arXqQDAFBPZ/9zdymyoPyeYZmFOqHmMDsk0t7REHxAhi8EobjqaFIwaJHCxEkE15udlkHnVxH1nIn/+f9u2N1f//Mn4YhqL3TvDxMEk3r1mEO64/ioofxwE7E1HBh95GORmlef4agSI/zpY7fRqKxNP9JtDT1/0T//+FgHFCR+j3u5qqYtyzMcwP1gl1DpdkxbTGY5AyXKy1HXL9Yqacmrq+Krr+v7SZmZ2d7lblrjdV93Q0aFAVcHPMq9Me77fAAfxipXRrAazKuC0UB8m1SsZSsuMW1/4I3kMRj6l3nM72Mecw93/6MiT4kH28xJu5yL2a2higILFq//uM6247W7HFAqZ1Z78i40ibZkIpMH0nm2ZT2GcgkTIpN1rUWb7HC64qBm/YSU7y//ugZPMBBF9n1vniXVp4jLrfPEuPTglbWeedk+HVKKt886asZAOMJgqVhTmDPe6wACZ3SSG4HWCsADQqjCvolr8VuV8QDifeESlHMpDX2zf6o6EZCl/0dn3suaytkFhguhjLNr3HIe89rRdZKYnYitoPkplAm3UjqImIGaI0E9lKKIhRfkN5G1mpZ/7r7DULP7A2ti/wqGQyHIp2Y4ZgP2xsAD45zIkvKGGYTZWpF02INhu+jQWF7noDfPIbDxq1Heinmf3XoPUQ01vpmH0bO26NVo1ORAOXt9b39b3SrbBc4mbqFbzedPM2qvHaHOSXQ1WYhG47RSNhVgZeahWU44YnztbjbjebOt5pXebscJ5qtd/daWrrOMR9Xx9f///EeHuDm+dTXhEsrs8Mm3cYAHTFkCNABfGHbAGhJLEah4uOJHXr5q8Br/etCjMiyph70PX/vXcef/t0+v8dGoPQmItRkfZipujmkFNcRVIKVHoTHCwUGiIPkR8IhGcoQLMrjwJGklFYlnmHmlnHmbfSbJM3/mJa3/Q5VpKsFW8PMwr/+0AATOrhoH5eKg3II+CCEJsmGpU81BCt6bLhKt3z+50HkNV2omA6//s1yf0J//+4IOy+/5jS51NqYqKEMNUxbtQwaLCzUeaDohi4sJ2UlvpcJRiPY2D2i69Zr7g1uepmkeoGbRcHhmhJ//ugRPEAA5BW1XmFTHiM7SqPPO+PDoGjT+aw5aGsq2p8wSLkgz/+lAA/aLS4DtvFggB9EHVEgtIJ5xp35RCb/IGolTDXKnK7S//VI481X/7c9lWh39RWAkRS/1mHypqzGNInAzaa/zVcPl0aihGiGBuRomThHfHil3lp/a9fZMezB/TbllfJOJGVhF3DzUmv/9wAEztQVOB1HIjl4JuNfOzx109af3jRrdHxjsR2Qq0kb+nx7DBen/Rq6G/a6RUBwHgtO/4iuPiZaNUU5bWmkYDjijGCGeJodTEmOh6aBOXdWSOd56v/5hR5T+xFCPoiSwAeHhWdD2/kAA//lWCAbfjlShrk2ex/ZqlkxeucPSNm/KHmqlD6nmkxikCL9pUgRzzWv+lmX1R1V/0KhKBuE5r6GsToezvskSyA4aPw4WiGjHTWQFJjSIrOb3sdmwNCiDdhpj5pFO2ftw/8cZBTPCWl7Vegs8yMBHh1l3BdfHAAP5QOlgZk4miMaiBRBFLqWpxnf8jdPUNruzzUvZE0s1Y7U1//PIqSXVf9B9OgzabUKpmoxCKiXEuiqpa1omq1oudY4eNlSATk+gQhWsgbrPPB6KikUgSxpNw6daqkocPyWAuS5e2hweTfB6qZ10eYamCbrZccU7ffH91XHz8HupOT0valAIeXh4RL/ZAAP/8xYcqhJ03mCTVG//ugRPUAA1FR03lnTPhnKtqPMKiPDtlZR+epM+IytSi8tq9d0t/JqNG5wx/6UU+1CVqqf9qOzO3+t/+/bgJpDzOT8+583N5tMaeqqXSJaNYRwypA6JJhkVY3csZONt/5yirqoiH//7GwCAPDvMQ8f+2AAf8OPEGMLD4ibpD1DFIg2PPe0PoyfPDtyA5GprMYd7f92R5hreujPff+tWnCUA6Wtq5yVRLnmGEVkSDEoMZtHHERRZCNnThhskR5CWz38hRb8UxaUv/92F0ncVDaXLHqcxKPEyGHzYADQ8vDp/8P2oIk8qE8ePRCA45JlRu/zpRqObShqnaf+9KOcMHf9pD6xIYIEcpLpD7M6lFJhxB7ZHUcgqZHGpVbxdf//TUAO8PEO6f7tAAf8tkhCEwDgQD4Yw+S26JXZx/Ma6llbZ/L/2muZwJU/9v//lZQFjH+v+/1pVmkcOqdEeXcUOKEMPBQkKj5OH3VRHnSVSEIDQjENGWAz2938asABleAYV2FAIQ/dXOKA5AGIr2Nr1DR/roq+v//9daIC//yp9siqkhWKx3Z3RejMcQodCLR0FJnqAACHkIib/wAAP+Po2FZvsbshQFZe/077/b/+mcaKAw//6pdqGIdna1mdotQeHRU3e5ryDFus4qh///oAGu3F9AAQBEvrwaE+Lmf6hl/T////+JjH/tthC9o//uARP2BAtVP0nniNHhvitpPLUmtCME3SeUAvGFnpyj8gSJ0LeOeJ6v0AAbYbSCgEgj/OHTBLCV/dL3POf/T/6////Uxx39mtpiOsWPNtltYoLCjSW3SQFUASxgCAAQH82AjL/+b5YMHtVpe0L2Y0J1HUXyiL9H1AACQCUACg/9Kf/qO///9QEpv/9vNeqKpHGVlIMgRDpDtJVgGYED3zv7P/////UFiP+UPdZUPKYLdfdUAHh7P/KH/8wf//6Irf//VNul3QNsew2pMQU1FMy4xMDAuMaqqqqqqqqqqqqqqqqoAAQAB/FP7f//////+r7pW///WAAAQCf/p/////+kt/5epZY4HQEK1TEFNRTMuMTAwLjFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDAuMVVVVVVVVVVVVVVVVVVVVVVVVVX/+2Bk7QABvlDQ+OAvEDtIul8oBeMEhDdDoBjlALqZqDRwC0hVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMC4xVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwLjFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDAuMVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+zBk+oIg+TJP4CA1UCKImgwIAqgDEAE5AAAAAF0hJ6AQCqFVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMC4xVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwLjFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBE8Y/wlwBOoAAAABSAGdgAAAAAAAH+AAAAIAAAP8AAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDAuMVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAH+AAAAIAAAP8AAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMC4xVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwLjFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk3Y/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDAuMVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMC4xVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwLjFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk3Y/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDAuMVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMC4xVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwLjFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk3Y/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDAuMVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMC4xVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwLjFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk3Y/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDAuMVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMC4xVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwLjFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk3Y/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDAuMVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMC4xVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwLjFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk3Y/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDAuMVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMC4xVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwLjFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk3Y/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDAuMVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMC4xVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwLjFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk3Y/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDAuMVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk3Y/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZN2P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk3Y/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
    const sound = new Audio("data:audio/mp3;base64," + base64);
    sound.volume = 0.1;
    sound.play();
  },
  hit() {
    // ノイズを生成
    const sampleRate = this.context.sampleRate;
    const hitSound = this.context.createBuffer(1, sampleRate / 10, sampleRate); // 0.1秒のバッファ
    const output = hitSound.getChannelData(0);
    // ホワイトノイズを生成
    for (let i = 0; i < output.length; i++) {
      output[i] = Math.random() * 2 - 1; // -1から1の間のランダムな値
    }
    // ノイズを再生
    const noiseSource = this.context.createBufferSource();
    noiseSource.buffer = hitSound;
    // エンベロープを追加
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(0.8, this.context.currentTime); // 初期音量
    gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.1); // 短時間で減衰
    // ノイズソースをゲインに接続
    noiseSource.connect(gainNode);
    gainNode.connect(this.context.destination);
    // 再生
    noiseSource.start();
    noiseSource.stop(this.context.currentTime + 0.1); // 0.1秒間再生
  },
  explosion() {
    // ノイズを生成
    const sampleRate = this.context.sampleRate;
    const noise = this.context.createBuffer(1, sampleRate, sampleRate);
    const output = noise.getChannelData(0);
    // ホワイトノイズを生成
    for (let i = 0; i < output.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    // ノイズを再生
    const noiseSource = this.context.createBufferSource();
    noiseSource.buffer = noise;
    // 音をフィルタリングして爆発音のように加工
    const filter = this.context.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, this.context.currentTime); // 中音域を強調
    filter.Q.setValueAtTime(5, this.context.currentTime); // Q値を調整
    // エンベロープを追加
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(0.8, this.context.currentTime); // 初期音量
    gainNode.gain.linearRampToValueAtTime(0.1, this.context.currentTime + 0.2); // 減衰
    // リバーブを追加
    const convolver = this.context.createConvolver();
    // リバーブのインパルス応答を生成
    const reverbBuffer = this.context.createBuffer(
      2,
      sampleRate * 2,
      sampleRate,
    );
    const leftChannel = reverbBuffer.getChannelData(0);
    const rightChannel = reverbBuffer.getChannelData(1);
    for (let i = 0; i < leftChannel.length; i++) {
      leftChannel[i] = (Math.random() * 2 - 1) * (1 - i / leftChannel.length);
      rightChannel[i] = (Math.random() * 2 - 1) * (1 - i / rightChannel.length);
    }
    convolver.buffer = reverbBuffer;

    // ノイズソースをフィルタ、ゲイン、リバーブに接続
    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(convolver);
    convolver.connect(this.context.destination);

    // 再生
    noiseSource.start();
    noiseSource.stop(this.context.currentTime + 0.5); // 0.5秒間再生
  },
};
