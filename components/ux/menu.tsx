"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

import dynamic from "next/dynamic";
const ModeToggle = dynamic(() => import("../modeToggle"), {
  ssr: false,
});

export default function Menu() {
  const pathname = usePathname();
  const profile = (
    <Link href={`/profile`}>
      <Button
        variant="outline"
        size={"default"}
        className={`border-none rounded-2xl shadow-none text-lg py-7 bg-white/0`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={`${pathname === "/profile" ? `none` : `none`}`}
          stroke={`${pathname === "/profile" ? `white` : `gray`}`}
          strokeWidth={1.8}
          x="0px"
          y="0px"
          width="32"
          height="32"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </Button>
    </Link>
  );
  return (
    <div
      className={`md:p-2 md:py-10 fixed left-0 bottom-0 md:w-auto w-full md:h-full flex flex-col justify-between items-center max-md:bg-black/20 max-md:backdrop-blur-md`}
    >
      <Link href={`/`} className="max-md:hidden">
        <svg
          className="size-12"
          viewBox="0 0 359 330"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M226 1L227 0H239L240 1H251L252 2H258L259 3H262L263 4H267L268 5H270L271 6H274L275 7H277L278 8H280L281 9H282L283 10H284L285 11H287L288 12H289L290 13H291L292 14H293L294 15H295L296 16H297L299 18H300L301 19H302L304 21H305L306 22H307L311 26H312L315 29H316L333 46V47L336 50V51L340 55V57L342 59V60L344 62V63L345 64V65L346 66V67L347 68V69L348 70V71L349 72V74L350 75V76L351 77V79L352 80V82L353 83V84L354 85V88L355 89V92L356 93V97L357 98V102L358 103V111L359 112V139L358 140V149L357 150V155L356 156V163L355 164V166L354 167V171L353 172V174L352 175V178L351 179V181L350 182V185L349 186V187L348 188V190L346 192V194L345 195V197L344 198V199L343 200V201L342 202V203L341 204V205L340 206V207L339 208V209L338 210V211L337 212V213L336 214V215L335 216V217L332 220V221L331 222V223L330 224V225L327 228V229L324 232V233L322 235V236L319 239V240L312 247H311L310 248H309L308 249H307L306 250H305L304 251H291L290 250H289L288 249H287L286 248H285L283 246H282L279 243V242L277 240V239L276 238V236L275 235V223L276 222V220L277 219V218L278 217V216L279 215V214L283 210V209L285 207V206L288 203V202L289 201V200L291 198V197L293 195V194L294 193V192L295 191V190L297 188V187L298 186V185L299 184V183L300 182V181L301 180V178L302 177V176L303 175V173L304 172V171L305 170V168L306 167V165L307 164V162L308 161V159L309 158V154L310 153V149L311 148V143L312 142V131L313 130V122L312 121V111L311 110V107L310 106V103L309 102V99L308 98V97L307 96V94L306 93V92L305 91V90L304 89V88L303 87V86L302 85V84L300 82V81L299 80V79L294 74V73L290 69H289V68L288 67H287L282 62H281L279 60H278L277 59H276L274 57H273L272 56H271L270 55H268L267 54H266L265 53H263L262 52H260L259 51H256L255 50H252L251 49H246L245 48H215L214 49H206L205 50H201L200 51H195L194 52H192L191 53H187L186 54H184L183 55H181L180 56H178L177 57H175L174 58H173L172 59H170L169 60H168L167 61H165L164 62H163L162 63H161L160 64H159L158 65H157L156 66H155L154 67H153L152 68H151L150 69H149L148 70H147L146 71H145L143 73H142L140 75H139L138 76H137L135 78H134L131 81H130L128 83H127L124 86H123L122 87H121L117 91H116L112 95H111L105 101H104L84 121V122L78 128V129L75 132V133L73 135V136L71 138V139L69 141V142L67 144V145L66 146V147L64 149V150L63 151V153L61 155V156L60 157V158L59 159V160L58 161V162L57 163V165L56 166V167L55 168V169L54 170V172L53 173V175L52 176V178L51 179V181L50 182V185L49 186V188L48 189V193L47 194V198L46 199V205L45 206V217L46 218V224L47 225V228L48 229V233L49 234V235L50 236V239L52 241V242L53 243V244L54 245V246L55 247V248L58 251V252L60 254V255L61 256H62V257L72 267H73L75 269H76L79 272H80L82 274H83L84 275H85L86 276H87L88 277H89L90 278H93L95 280H98L99 281H102L103 282H106L107 283H131L132 282H138L139 281H143L144 280H147L148 279H150L151 278H154L155 277H156L157 276H159L160 275H161L162 274H163L166 271L160 265V264L157 261V260L154 257V256L151 253V252L150 251V250L149 249V248L147 246V244L146 243V242L145 241V240L144 239V237L143 236V234L142 233V230L141 229V224L140 223V216L139 215V210L140 209V202L141 201V197L142 196V194L143 193V191L144 190V189L145 188V187L146 186V185L147 184V183L149 181V180L151 178V177L153 175V174H154L157 171V170H158L161 167V166H162L164 164H165L167 162H168L170 160H171L172 159H173L174 158H175L176 157H177L178 156H180L181 155H183L184 154H188L189 153H210L211 154H214L215 155H218L219 156H220L221 157H223L224 158H225L226 159H227L228 160H229L231 162H232L235 165H236L244 173V174L247 177V178L249 180V181L250 182V183L251 184V185L252 186V187L253 188V189L254 190V192L255 193V194L256 195V197L257 198V202L258 203V208L259 209V223L258 224V230L257 231V234L256 235V237L255 238V240L254 241V242L253 243V245L252 246V247L251 248V249L250 250V251L249 252V253L248 254V255L247 256V257L246 258V259L244 261V262L242 264V265L241 266V267L240 268V269L239 270V271L244 276H245L247 278H248L252 282H253L257 286H258L259 287H260V288L263 291H264V292L266 294V295L268 297V298L269 299V301L270 302V306L271 307V308L270 309V314L269 315V316L268 317V318L266 320V321L265 322V323H264L260 327H259L258 328H257L256 329H254L253 330H241L240 329H238L237 328H236L234 326H233L231 324H230L227 321H226L224 319H223L220 316H219L216 313H215L212 310H211L208 307H207L205 305L204 306H202L200 308H199L198 309H197L196 310H195L194 311H193L192 312H191L190 313H189L188 314H187L186 315H185L184 316H183L182 317H181L180 318H178L177 319H176L175 320H173L172 321H170L169 322H167L166 323H164L163 324H161L160 325H157L156 326H153L152 327H147L146 328H143L142 329H135L134 330H105L104 329H97L96 328H93L92 327H88L87 326H85L84 325H81L80 324H79L78 323H76L75 322H73L72 321H71L70 320H69L68 319H67L66 318H65L64 317H63L62 316H61L60 315H59L58 314H57L55 312H54L51 309H49V308L48 307H47L44 304H43L38 299H37L35 297V296L34 295H33L27 289V288L22 283V282L20 280V279L17 276V275L15 273V272L14 271V270L13 269V268L12 267V266L11 265V264L10 263V262L9 261V260L8 259V258L7 257V255L6 254V252L5 251V250L4 249V246L3 245V242L2 241V237L1 236V230L0 229V196L1 195V187L2 186V181L3 180V176L4 175V173L5 172V169L6 168V166L7 165V162L8 161V159L9 158V156L10 155V153L11 152V151L12 150V149L13 148V146L14 145V144L15 143V142L16 141V140L17 139V137L19 135V134L20 133V132L21 131V130L22 129V128L23 127V126L25 124V123L26 122V121L28 119V118L30 116V115L32 113V112L33 111V110L37 106V105L39 103V102L44 97V96L49 91V90L60 79V78L70 68H71L79 60H80L86 54H87L91 50H92L94 48H95L98 45H99L101 43H102L105 40H106L108 38H109L110 37H111L113 35H114L115 34H116L118 32H119L120 31H121L122 30H123L125 28H126L127 27H128L129 26H130L131 25H132L133 24H134L135 23H136L137 22H139L140 21H141L142 20H143L144 19H146L147 18H148L149 17H150L151 16H154L155 15H156L157 14H159L160 13H161L162 12H164L165 11H167L168 10H171L172 9H175L176 8H179L180 7H182L183 6H187L188 5H191L192 4H197L198 3H203L204 2H211L212 1H226ZM199 238.5C208.5 240 219.5 204 203.5 198.5H194.5C190.5 199 186.9 204.2 186.5 209C186 215 189.5 237 199 238.5Z"
            className="fill-[#202020] dark:fill-white"
          />
        </svg>
      </Link>
      <div
        className={`w-full flex flex-col max-md:flex-row justify-around items-center gap-3`}
      >
        <Link href={`/`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-2xl shadow-none text-lg py-7 bg-white/0 dark:fill-white`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0 0 48 48"
              fill={`${pathname === "/" ? `dark:fill-white` : `none`}`}
              stroke={`${pathname === "/" ? `dark:stroke-white` : `gray`}`}
              strokeWidth={`3`}
            >
              <path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9	C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52	C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z"></path>
            </svg>
          </Button>
        </Link>
        <Link href={`/reels`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-2xl shadow-none text-lg py-7 bg-white/0 dark:fill-white`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill={`${pathname === "/reels" ? `dark:fill-white` : `none`}`}
              stroke={`${pathname === "/reels" ? `dark:stroke-white` : `gray`}`}
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
          </Button>
        </Link>
        <Link href={`/search`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-2xl shadow-none text-lg py-7 bg-white/0`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              x="0px"
              y="0px"
              width="32"
              height="32"
              fill={`none`}
              stroke={pathname === "/search" ? `white` : `gray`}
              strokeWidth={`2`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Button>
        </Link>
        <Link href={`/new`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-2xl shadow-none text-lg py-7 bg-white/0`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill={`none`}
              stroke={pathname === "/new" ? `white` : `gray`}
              strokeWidth={`2`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Button>
        </Link>
        <Link href={`/notifications`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-2xl shadow-none text-lg py-7 bg-white/0 dark:fill-white`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill={`${pathname === "/notifications" ? `dark:fill-white` : `none`
                }`}
              stroke={`${pathname === "/notifications" ? `dark:stroke-white` : `gray`
                }`}
              strokeWidth={`2`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </Button>
        </Link>
        {profile}
      </div>
      <div
        className={`w-full flex flex-col gap-2 max-md:flex-row justify-center items-center max-md:hidden`}
      >
        <Link href={`/menu`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-2xl shadow-none text-lg py-7 bg-white/0`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              x="0px"
              y="0px"
              width="32"
              height="32"
              fill={`none`}
              stroke={pathname === "/menu" ? `white` : `gray`}
              strokeWidth={`2`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
}
