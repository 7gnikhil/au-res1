
import { Student, SemesterResult, CourseResult } from '../types';

/**
 * Internal marks mapping derived from the provided PDF Screenshots (Pages 1-9).
 * Subjects: [EML, CS-II, WPM, ED, CS LAB, WPM LAB, EML LAB, QAR]
 */
const INTERNAL_MARKS_MAPPING: { [roll: string]: number[] } = {
  // --- PAGE 1 (SECTION A) ---
  "22EG507A03": [22, 34, 18, 38, 37, 37, 35, 7],
  "23EG107A01": [38, 44, 39, 47, 44, 47, 46, 26],
  "23EG107A02": [43, 47, 46, 50, 45, 49, 45, 30],
  "23EG107A03": [40, 48, 47, 43, 47, 48, 40, 25],
  "23EG107A04": [26, 34, 27, 37, 38, 41, 33, 21],
  "23EG107A05": [29, 34, 32, 43, 40, 41, 35, 24],
  "23EG107A06": [24, 30, 18, 32, 37, 37, 33, 23],
  "23EG107A07": [29, 42, 38, 37, 43, 46, 39, 20],
  "23EG107A08": [27, 41, 40, 41, 42, 44, 38, 21],
  "23EG107A09": [33, 47, 45, 44, 47, 50, 40, 26],
  "23EG107A10": [37, 45, 44, 46, 43, 45, 40, 28],
  "23EG107A11": [31, 46, 41, 45, 47, 44, 42, 27],
  "23EG107A12": [41, 48, 47, 48, 49, 48, 44, 38],
  "23EG107A13": [31, 44, 43, 41, 45, 40, 40, 23],
  "23EG107A14": [37, 45, 42, 44, 49, 48, 46, 27],
  "23EG107A15": [28, 31, 26, 36, 32, 38, 37, 24],
  "23EG107A16": [25, 30, 23, 28, 32, 41, 32, 15],
  "23EG107A17": [27, 32, 35, 34, 44, 43, 37, 30],
  "23EG107A18": [41, 48, 46, 46, 48, 48, 49, 34],
  "23EG107A19": [47, 48, 49, 49, 49, 49, 50, 33],
  "23EG107A20": [38, 46, 47, 48, 44, 44, 44, 31],
  "23EG107A22": [28, 39, 27, 43, 39, 43, 36, 27],
  "23EG107A23": [42, 48, 45, 49, 49, 47, 46, 23],
  "23EG107A24": [23, 32, 26, 40, 42, 42, 34, 20],
  "23EG107A25": [29, 39, 27, 38, 45, 43, 36, 17],
  "23EG107A26": [43, 47, 49, 48, 47, 48, 48, 24],
  "23EG107A27": [38, 46, 46, 42, 47, 48, 44, 24],
  "23EG107A28": [32, 45, 40, 43, 47, 43, 38, 23],
  "23EG107A29": [33, 43, 39, 40, 43, 47, 38, 22],
  "23EG107A30": [36, 46, 45, 48, 48, 48, 47, 30],
  "23EG107A31": [40, 43, 46, 42, 46, 47, 47, 27],
  "23EG107A32": [39, 45, 48, 50, 45, 47, 46, 39],
  "23EG107A34": [33, 47, 48, 46, 47, 48, 38, 22],
  "23EG107A35": [39, 46, 46, 45, 49, 47, 40, 34],
  "23EG107A36": [27, 34, 34, 41, 44, 41, 38, 21],
  "23EG107A37": [30, 40, 41, 43, 44, 48, 45, 23],
  "23EG107A38": [31, 35, 27, 42, 44, 44, 37, 40],
  "23EG107A39": [37, 42, 44, 41, 43, 47, 40, 27],
  "23EG107A40": [31, 42, 34, 44, 45, 46, 39, 18],
  "23EG107A43": [25, 31, 17, 35, 34, 35, 26, 18],

  // --- PAGE 2 (SECTION A & B) ---
  "23EG107A44": [37, 46, 35, 41, 43, 45, 41, 29],
  "23EG107A45": [45, 49, 49, 48, 50, 50, 50, 35],
  "23EG107A46": [40, 45, 48, 47, 47, 48, 47, 27],
  "23EG107A48": [38, 46, 49, 45, 47, 49, 44, 27],
  "23EG107A49": [39, 48, 45, 48, 49, 47, 45, 31],
  "23EG107A50": [32, 39, 36, 47, 44, 44, 40, 30],
  "23EG107A51": [34, 44, 37, 42, 43, 44, 45, 14],
  "23EG107A52": [33, 48, 48, 43, 48, 49, 42, 28],
  "23EG107A55": [25, 32, 19, 45, 39, 37, 35, 23],
  "23EG107A56": [35, 45, 41, 40, 47, 46, 41, 9],
  "23EG107A57": [29, 42, 33, 42, 44, 45, 38, 21],
  "23EG107A58": [37, 42, 36, 48, 44, 47, 43, 27],
  "23EG107A59": [38, 47, 48, 43, 47, 49, 45, 28],
  "23EG107A60": [41, 48, 47, 47, 47, 49, 47, 30],
  "23EG107A61": [39, 47, 41, 44, 49, 48, 46, 25],
  "23EG107A62": [32, 39, 32, 44, 43, 45, 40, 20],
  "23EG107A63": [38, 48, 41, 39, 49, 47, 50, 24],
  "23EG107A64": [29, 36, 24, 39, 42, 39, 45, 31],
  "23EG107A66": [28, 42, 33, 46, 43, 42, 45, 24],
  "23EG107B62": [28, 35, 34, 39, 43, 41, 38, 24],
  "23EG107B01": [39, 45, 44, 33, 48, 47, 43, 31],
  "23EG107B02": [40, 48, 47, 36, 45, 49, 44, 24],
  "23EG107B03": [42, 47, 47, 37, 47, 48, 48, 31],
  "23EG107B04": [29, 33, 33, 25, 44, 48, 38, 17],
  "23EG107B05": [38, 45, 43, 33, 49, 45, 44, 26],
  "23EG107B07": [29, 40, 38, 27, 48, 47, 43, 21],
  "23EG107B08": [37, 43, 43, 30, 48, 47, 42, 26],
  "23EG107B09": [34, 45, 36, 30, 48, 47, 39, 28],
  "23EG107B10": [33, 35, 31, 35, 43, 45, 38, 24],
  "23EG107B11": [29, 45, 36, 25, 43, 46, 39, 29],
  "23EG107B12": [40, 48, 47, 34, 50, 46, 44, 23],
  "23EG107B13": [33, 18, 28, 23, 31, 42, 38, 22],
  "23EG107B14": [36, 38, 43, 31, 43, 47, 43, 28],
  "23EG107B15": [36, 45, 45, 25, 50, 48, 45, 18],
  "23EG107B16": [45, 49, 48, 36, 49, 48, 49, 27],
  "23EG107B17": [43, 44, 49, 37, 48, 49, 47, 28],
  "23EG107B18": [28, 38, 39, 32, 47, 46, 44, 18],
  "23EG107B19": [44, 48, 46, 36, 50, 48, 48, 30],
  "23EG107B20": [39, 50, 49, 30, 50, 49, 46, 24],
  "23EG107B21": [37, 43, 40, 35, 39, 46, 42, 19],
  "23EG107B22": [25, 29, 31, 28, 42, 27, 36, 28],

  // --- PAGE 3 (SECTION B & C) ---
  "23EG107B23": [40, 44, 44, 33, 46, 47, 46, 28],
  "23EG107B24": [42, 40, 42, 30, 42, 48, 46, 28],
  "23EG107B25": [37, 41, 45, 26, 45, 46, 45, 22],
  "23EG107B26": [38, 38, 37, 31, 43, 43, 44, 16],
  "23EG107B27": [39, 42, 44, 29, 40, 48, 43, 29],
  "23EG107B28": [35, 33, 37, 22, 45, 46, 41, 27],
  "23EG107B30": [31, 27, 34, 30, 42, 41, 43, 16],
  "23EG107B31": [32, 32, 37, 29, 39, 45, 38, 24],
  "23EG107B32": [32, 40, 37, 31, 39, 44, 38, 26],
  "23EG107B33": [27, 35, 38, 23, 40, 46, 36, 33],
  "23EG107B34": [39, 47, 44, 34, 49, 47, 43, 32],
  "23EG107B35": [42, 47, 43, 35, 46, 47, 48, 20],
  "23EG107B36": [41, 49, 40, 38, 47, 48, 50, 34],
  "23EG107B38": [39, 38, 43, 36, 38, 47, 45, 37],
  "23EG107B39": [38, 34, 35, 33, 38, 45, 40, 37],
  "23EG107B40": [21, 31, 26, 25, 34, 44, 33, 16],
  "23EG107B41": [37, 43, 45, 34, 47, 47, 43, 29],
  "23EG107B43": [30, 33, 35, 27, 35, 43, 37, 19],
  "23EG107B44": [46, 48, 46, 37, 47, 48, 49, 30],
  "23EG107B45": [26, 34, 34, 26, 34, 44, 33, 25],
  "23EG107B46": [36, 40, 42, 30, 44, 49, 43, 29],
  "23EG107B47": [41, 44, 42, 30, 46, 48, 45, 39],
  "23EG107B48": [40, 49, 44, 34, 47, 48, 46, 22],
  "23EG107B49": [31, 38, 32, 32, 48, 45, 40, 16],
  "23EG107B50": [21, 27, 28, 25, 35, 45, 34, 28],
  "23EG107B51": [30, 37, 34, 37, 34, 43, 37, 27],
  "23EG107B52": [32, 38, 36, 27, 40, 44, 38, 33],
  "23EG107B53": [38, 44, 39, 35, 42, 48, 44, 24],
  "23EG107B55": [34, 39, 41, 32, 41, 47, 41, 19],
  "23EG107B56": [34, 34, 33, 29, 44, 44, 39, 26],
  "23EG107B57": [46, 49, 47, 34, 50, 47, 48, 39],
  "23EG107B58": [25, 29, 28, 33, 35, 42, 33, 17],
  "23EG107B59": [41, 45, 44, 28, 43, 47, 46, 42],
  "23EG107B60": [36, 43, 39, 32, 46, 46, 42, 29],
  "23EG107B61": [18, 33, 28, 32, 35, 42, 30, 24],
  "23EG107B63": [40, 36, 36, 32, 46, 47, 44, 35],
  "23EG107B64": [28, 29, 30, 25, 39, 45, 39, 35],
  "23EG107B65": [35, 46, 42, 33, 44, 45, 40, 27],
  "23EG107B66": [48, 50, 47, 40, 50, 48, 48, 30],
  "24EG507B01": [36, 42, 42, 29, 48, 46, 43, 23],
  "23EG107C01": [26, 32, 26, 37, 40, 44, 46, 15],

  // --- PAGE 4 (SECTION C) ---
  "23EG107C02": [45, 41, 36, 42, 49, 44, 46, 35],
  "23EG107C03": [44, 38, 38, 45, 46, 45, 44, 24],
  "23EG107C04": [36, 37, 32, 40, 33, 43, 43, 20],
  "23EG107C05": [27, 34, 26, 35, 36, 43, 44, 21],
  "23EG107C06": [40, 41, 37, 47, 44, 41, 45, 35],
  "23EG107C08": [30, 40, 38, 43, 42, 40, 40, 19],
  "23EG107C09": [26, 30, 27, 40, 31, 38, 37, 12],
  "23EG107C10": [23, 34, 29, 39, 35, 44, 40, 26],
  "23EG107C11": [28, 33, 29, 43, 36, 44, 44, 26],
  "23EG107C13": [27, 32, 25, 35, 30, 43, 40, 20],
  "23EG107C14": [33, 35, 31, 43, 31, 43, 44, 20],
  "23EG107C15": [33, 34, 36, 45, 36, 45, 42, 27],
  "23EG107C16": [25, 29, 29, 36, 33, 44, 42, 24],
  "23EG107C17": [38, 48, 45, 47, 49, 50, 45, 29],
  "23EG107C18": [32, 39, 28, 45, 48, 50, 46, 38],
  "23EG107C19": [25, 30, 34, 38, 38, 44, 46, 33],
  "23EG107C20": [28, 31, 30, 38, 39, 45, 46, 27],
  "23EG107C21": [30, 31, 34, 33, 40, 44, 42, 22],
  "23EG107C22": [40, 42, 43, 48, 50, 45, 49, 39],
  "23EG107C23": [31, 35, 36, 34, 42, 47, 38, 18],
  "23EG107C25": [41, 39, 43, 47, 45, 44, 46, 35],
  "23EG107C26": [32, 29, 29, 34, 35, 44, 43, 28],
  "23EG107C27": [41, 39, 46, 45, 47, 50, 45, 25],
  "23EG107C28": [32, 30, 28, 44, 40, 44, 42, 29],
  "23EG107C29": [26, 33, 30, 34, 34, 42, 40, 28],
  "23EG107C30": [38, 41, 35, 39, 41, 44, 43, 25],
  "23EG107C31": [40, 42, 39, 45, 47, 43, 45, 20],
  "23EG107C32": [35, 37, 34, 44, 44, 44, 46, 23],
  "23EG107C33": [35, 37, 37, 38, 46, 47, 44, 28],
  "23EG107C34": [33, 40, 37, 43, 48, 45, 39, 18],
  "23EG107C35": [42, 44, 39, 47, 47, 45, 47, 24],
  "23EG107C36": [38, 40, 40, 47, 29, 47, 44, 22],
  "23EG107C37": [28, 32, 27, 32, 36, 44, 39, 17],
  "23EG107C38": [42, 44, 44, 46, 45, 48, 44, 26],
  "23EG107C39": [46, 44, 41, 48, 48, 45, 45, 37],
  "23EG107C40": [33, 42, 36, 39, 46, 45, 46, 32],
  "23EG107C41": [32, 36, 31, 42, 35, 42, 45, 30],
  "23EG107C42": [34, 36, 37, 43, 37, 41, 40, 21],
  "23EG107C43": [38, 36, 41, 44, 48, 50, 41, 33],
  "23EG107C44": [36, 40, 37, 42, 46, 43, 40, 19],
  "23EG107C45": [39, 40, 39, 43, 40, 44, 42, 25],

  // --- PAGE 5 (SECTION C & D) ---
  "23EG107C46": [38, 38, 32, 45, 45, 45, 46, 28],
  "23EG107C47": [29, 37, 32, 38, 36, 42, 41, 20],
  "23EG107C49": [28, 30, 30, 35, 32, 43, 42, 24],
  "23EG107C50": [33, 42, 36, 43, 40, 47, 46, 25],
  "23EG107C51": [30, 36, 32, 35, 31, 42, 35, 22],
  "23EG107C52": [39, 39, 41, 43, 36, 45, 40, 25],
  "23EG107C53": [40, 42, 46, 47, 40, 48, 38, 25],
  "23EG107C54": [25, 34, 29, 34, 28, 47, 40, 26],
  "23EG107C56": [41, 39, 40, 45, 35, 43, 41, 34],
  "23EG107C57": [44, 41, 41, 43, 48, 48, 43, 18],
  "23EG107C58": [38, 36, 40, 45, 43, 45, 42, 23],
  "23EG107C59": [48, 48, 46, 48, 50, 50, 46, 34],
  "23EG107C60": [47, 49, 50, 48, 50, 50, 47, 43],
  "23EG107C61": [33, 37, 33, 44, 41, 44, 44, 14],
  "23EG107C62": [47, 48, 46, 47, 49, 50, 49, 36],
  "23EG107C63": [43, 43, 39, 48, 46, 45, 48, 30],
  "23EG107C64": [31, 36, 30, 46, 38, 44, 39, 25],
  "23EG107C65": [46, 47, 50, 45, 50, 50, 47, 43],
  "23EG107C66": [42, 45, 42, 47, 48, 45, 44, 23],
  "23EG107D01": [39, 48, 47, 48, 49, 50, 36, 41],
  "23EG107D02": [39, 47, 48, 49, 47, 50, 36, 37],
  "23EG107D03": [44, 48, 49, 49, 50, 50, 42, 42],
  "23EG107D04": [47, 48, 50, 47, 50, 50, 45, 41],
  "23EG107D05": [47, 48, 49, 45, 50, 50, 39, 44],
  "23EG107D06": [28, 28, 26, 32, 41, 37, 36, 34],
  "23EG107D07": [41, 47, 43, 49, 47, 49, 40, 38],
  "23EG107D08": [38, 44, 49, 48, 45, 47, 41, 30],
  "23EG107D09": [32, 35, 35, 42, 39, 38, 37, 30],
  "23EG107D10": [35, 48, 47, 50, 47, 47, 45, 46],
  "23EG107D12": [33, 40, 39, 47, 47, 50, 37, 29],
  "23EG107D13": [27, 33, 24, 35, 41, 36, 32, 13],
  "23EG107D15": [30, 36, 29, 44, 46, 42, 34, 39],
  "23EG107D17": [37, 45, 39, 43, 42, 43, 36, 30],
  "23EG107D18": [41, 45, 39, 49, 45, 43, 43, 42],
  "23EG107D19": [26, 31, 39, 41, 44, 44, 32, 37],
  "23EG107D20": [39, 40, 42, 48, 44, 48, 38, 26],
  "23EG107D21": [27, 33, 25, 40, 42, 36, 34, 21],
  "23EG107D22": [41, 47, 43, 48, 47, 49, 43, 32],
  "23EG107D23": [38, 42, 48, 49, 50, 50, 41, 35],
  "23EG107D24": [28, 27, 29, 33, 40, 40, 32, 19],
  "23EG107D25": [20, 25, 31, 34, 44, 48, 30, 26],

  // --- PAGE 6 (SECTION D & E) ---
  "23EG107D27": [37, 41, 45, 50, 48, 46, 44, 40],
  "23EG107D28": [29, 37, 38, 47, 43, 46, 34, 28],
  "23EG107D30": [38, 41, 39, 49, 45, 48, 42, 30],
  "23EG107D31": [39, 47, 44, 47, 45, 47, 41, 41],
  "23EG107D32": [41, 48, 46, 49, 45, 50, 40, 37],
  "23EG107D34": [27, 30, 33, 47, 41, 47, 31, 30],
  "23EG107D35": [37, 41, 42, 48, 46, 48, 37, 34],
  "23EG107D36": [35, 41, 42, 46, 47, 46, 35, 40],
  "23EG107D37": [31, 40, 37, 46, 44, 43, 35, 37],
  "23EG107D38": [42, 49, 50, 49, 48, 50, 41, 46],
  "23EG107D39": [44, 49, 50, 49, 50, 50, 46, 45],
  "23EG107D40": [31, 39, 38, 47, 44, 41, 31, 37],
  "23EG107D41": [32, 33, 34, 36, 43, 42, 34, 32],
  "23EG107D42": [43, 46, 47, 46, 44, 46, 43, 38],
  "23EG107D44": [38, 45, 41, 46, 45, 48, 41, 38],
  "23EG107D45": [40, 47, 44, 47, 47, 48, 41, 28],
  "23EG107D46": [37, 43, 42, 48, 47, 50, 40, 30],
  "23EG107D47": [26, 34, 31, 38, 41, 44, 29, 38],
  "23EG107D48": [34, 47, 44, 46, 49, 50, 42, 36],
  "23EG107D49": [37, 41, 42, 47, 42, 45, 36, 40],
  "23EG107D50": [39, 42, 48, 47, 44, 49, 40, 41],
  "23EG107D51": [40, 45, 43, 45, 47, 45, 41, 31],
  "23EG107D52": [33, 39, 34, 39, 42, 44, 36, 33],
  "23EG107D53": [26, 34, 23, 30, 42, 40, 30, 34],
  "23EG107D54": [41, 45, 48, 48, 47, 50, 40, 35],
  "23EG107D55": [39, 43, 41, 48, 45, 42, 38, 34],
  "23EG107D56": [38, 38, 44, 47, 43, 41, 42, 37],
  "23EG107D57": [30, 37, 34, 42, 44, 37, 38, 27],
  "23EG107D58": [23, 29, 25, 45, 39, 36, 29, 14],
  "23EG107D59": [37, 46, 42, 46, 49, 50, 36, 39],
  "23EG107D60": [40, 45, 39, 46, 49, 44, 40, 42],
  "23EG107D61": [37, 41, 45, 48, 46, 50, 38, 44],
  "23EG107D62": [44, 45, 45, 49, 43, 46, 44, 36],
  "23EG107D63": [32, 33, 33, 42, 40, 45, 32, 36],
  "23EG107D64": [44, 46, 46, 50, 48, 46, 45, 33],
  "23EG107D65": [41, 37, 34, 46, 44, 42, 42, 33],
  "23EG107D66": [32, 33, 27, 38, 43, 41, 37, 38],
  "23EG107E01": [45, 41, 48, 40, 41, 49, 42, 34],
  "23EG107E02": [41, 35, 42, 37, 44, 47, 40, 41],
  "23EG107E03": [44, 39, 46, 39, 44, 46, 43, 39],
  "23EG107E04": [30, 24, 32, 37, 40, 46, 40, 31],

  // --- PAGE 7 (SECTION E) ---
  "23EG107E05": [45, 38, 37, 39, 45, 46, 42, 39],
  "23EG107E06": [36, 36, 40, 39, 39, 43, 35, 42],
  "23EG107E08": [26, 21, 29, 26, 34, 43, 32, 32],
  "23EG107E09": [28, 25, 32, 34, 43, 44, 26, 35],
  "23EG107E11": [42, 37, 48, 40, 47, 50, 42, 41],
  "23EG107E12": [46, 42, 47, 38, 49, 50, 47, 39],
  "23EG107E13": [29, 28, 28, 35, 41, 43, 32, 34],
  "23EG107E14": [43, 40, 47, 37, 47, 50, 47, 38],
  "23EG107E15": [42, 39, 46, 39, 45, 48, 43, 34],
  "23EG107E16": [46, 45, 46, 36, 47, 47, 42, 30],
  "23EG107E17": [40, 42, 46, 42, 41, 49, 40, 29],
  "23EG107E18": [39, 32, 45, 41, 46, 50, 42, 35],
  "23EG107E19": [46, 39, 48, 41, 45, 45, 42, 35],
  "23EG107E20": [32, 34, 41, 35, 41, 46, 35, 30],
  "23EG107E21": [34, 35, 36, 36, 40, 45, 31, 24],
  "23EG107E22": [39, 38, 50, 42, 46, 50, 41, 29],
  "23EG107E23": [44, 41, 46, 39, 45, 48, 43, 30],
  "23EG107E24": [28, 25, 27, 33, 37, 40, 30, 28],
  "23EG107E25": [43, 42, 49, 41, 46, 48, 43, 27],
  "23EG107E26": [33, 34, 40, 35, 42, 45, 32, 33],
  "23EG107E27": [44, 42, 46, 43, 46, 49, 39, 44],
  "23EG107E28": [27, 26, 36, 34, 39, 44, 33, 36],
  "23EG107E29": [41, 37, 45, 37, 42, 48, 38, 26],
  "23EG107E30": [39, 39, 49, 39, 41, 48, 36, 33],
  "23EG107E32": [43, 34, 43, 40, 43, 41, 41, 22],
  "23EG107E33": [45, 37, 50, 42, 44, 50, 46, 31],
  "23EG107E34": [44, 37, 43, 37, 46, 46, 43, 30],
  "23EG107E35": [46, 41, 50, 39, 49, 50, 43, 33],
  "23EG107E37": [39, 42, 47, 37, 48, 47, 44, 25],
  "23EG107E38": [31, 26, 32, 35, 38, 43, 34, 26],
  "23EG107E39": [43, 43, 48, 40, 47, 49, 44, 21],
  "23EG107E40": [40, 36, 43, 39, 44, 48, 36, 31],
  "23EG107E41": [41, 33, 44, 38, 44, 47, 41, 30],
  "23EG107E42": [42, 36, 42, 36, 42, 47, 39, 36],
  "23EG107E43": [35, 31, 44, 40, 41, 49, 38, 31],
  "23EG107E44": [32, 28, 40, 35, 44, 49, 34, 34],
  "23EG107E45": [26, 25, 30, 27, 38, 45, 33, 20],
  "23EG107E46": [30, 30, 34, 37, 47, 50, 34, 33],
  "23EG107E47": [35, 34, 41, 29, 41, 49, 32, 28],
  "23EG107E48": [43, 33, 46, 36, 43, 46, 40, 31],
  "23EG107E50": [37, 38, 40, 39, 46, 44, 36, 28],

  // --- PAGE 8 (SECTION E & F) ---
  "23EG107E51": [45, 43, 49, 40, 43, 48, 42, 34],
  "23EG107E52": [38, 32, 45, 36, 41, 49, 35, 26],
  "23EG107E53": [32, 24, 36, 38, 40, 46, 33, 23],
  "23EG107E54": [41, 30, 45, 39, 44, 43, 36, 33],
  "23EG107E55": [39, 36, 39, 40, 43, 44, 37, 34],
  "23EG107E56": [37, 35, 42, 33, 46, 46, 39, 21],
  "23EG107E57": [45, 40, 48, 42, 46, 49, 43, 33],
  "23EG107E58": [34, 32, 31, 29, 43, 44, 36, 28],
  "23EG107E59": [34, 34, 36, 38, 43, 45, 37, 22],
  "23EG107E60": [40, 38, 46, 39, 42, 48, 39, 32],
  "23EG107E61": [41, 34, 41, 37, 44, 48, 38, 38],
  "23EG107E62": [25, 30, 32, 33, 37, 41, 32, 28],
  "23EG107E63": [30, 33, 41, 40, 42, 50, 33, 30],
  "23EG107E64": [45, 38, 45, 34, 47, 50, 47, 30],
  "23EG107E65": [47, 48, 50, 42, 46, 49, 47, 36],
  "23EG107E66": [33, 34, 35, 38, 44, 43, 33, 29],
  "23EG107F01": [43, 41, 42, 44, 41, 42, 47, 30],
  "23EG107F02": [43, 38, 41, 39, 42, 46, 45, 28],
  "23EG107F03": [35, 37, 36, 42, 40, 44, 41, 32],
  "23EG107F04": [43, 42, 45, 42, 42, 42, 45, 25],
  "23EG107F05": [39, 32, 39, 39, 39, 43, 41, 27],
  "23EG107F06": [32, 27, 31, 39, 38, 40, 39, 26],
  "23EG107F07": [41, 36, 44, 43, 40, 42, 42, 30],
  "23EG107F09": [40, 38, 44, 44, 42, 43, 45, 31],
  "23EG107F10": [24, 33, 36, 40, 38, 35, 36, 23],
  "23EG107F11": [31, 25, 36, 39, 36, 38, 40, 31],
  "23EG107F12": [32, 30, 31, 44, 43, 43, 40, 25],
  "23EG107F14": [42, 37, 47, 45, 45, 47, 46, 31],
  "23EG107F15": [29, 35, 44, 42, 41, 45, 42, 26],
  "23EG107F16": [42, 41, 45, 43, 38, 45, 48, 33],
  "23EG107F17": [30, 37, 42, 43, 38, 42, 44, 23],
  "23EG107F18": [41, 40, 44, 44, 44, 47, 42, 36],
  "23EG107F19": [35, 34, 41, 45, 39, 48, 40, 24],
  "23EG107F20": [44, 40, 46, 43, 42, 44, 47, 22],
  "23EG107F21": [44, 39, 45, 43, 44, 48, 45, 28],
  "23EG107F22": [45, 43, 47, 42, 46, 48, 46, 31],
  "23EG107F23": [45, 47, 50, 43, 45, 49, 47, 33],
  "23EG107F24": [30, 33, 41, 39, 45, 39, 37, 29],
  "23EG107F25": [34, 41, 45, 42, 38, 42, 45, 30],
  "23EG107F26": [36, 32, 40, 42, 40, 34, 44, 29],
  "23EG107F27": [27, 34, 40, 42, 40, 38, 41, 36],

  // --- PAGE 9 (SECTION F) ---
  "23EG107F28": [34, 26, 37, 41, 44, 40, 42, 38],
  "23EG107F29": [42, 41, 42, 44, 45, 41, 49, 34],
  "23EG107F30": [24, 24, 33, 37, 33, 40, 36, 26],
  "23EG107F31": [37, 37, 38, 43, 43, 40, 43, 32],
  "23EG107F32": [35, 34, 35, 42, 36, 41, 42, 21],
  "23EG107F34": [40, 37, 44, 44, 45, 48, 43, 28],
  "23EG107F35": [25, 34, 40, 35, 40, 43, 42, 24],
  "23EG107F36": [31, 31, 41, 40, 43, 43, 38, 26],
  "23EG107F37": [19, 28, 36, 40, 36, 37, 33, 30],
  "23EG107F39": [16, 18, 29, 40, 33, 43, 31, 32],
  "23EG107F42": [35, 33, 40, 44, 35, 42, 41, 31],
  "23EG107F43": [20, 29, 33, 41, 43, 37, 31, 33],
  "23EG107F44": [32, 36, 39, 45, 42, 42, 40, 26],
  "23EG107F45": [46, 50, 50, 45, 46, 50, 49, 37],
  "23EG107F46": [31, 29, 38, 40, 40, 43, 37, 31],
  "23EG107F47": [37, 36, 43, 36, 45, 44, 42, 31],
  "23EG107F48": [37, 41, 44, 36, 46, 45, 45, 35],
  "23EG107F49": [44, 44, 45, 44, 43, 46, 48, 32],
  "23EG107F50": [22, 24, 36, 38, 38, 37, 32, 27],
  "23EG107F51": [25, 16, 27, 38, 38, 41, 31, 24],
  "23EG107F52": [31, 39, 42, 44, 38, 46, 44, 26],
  "23EG107F53": [17, 25, 38, 40, 37, 43, 35, 20],
  "23EG107F55": [42, 36, 40, 39, 45, 44, 46, 34],
  "23EG107F56": [32, 34, 40, 38, 46, 37, 38, 37],
  "23EG107F57": [24, 35, 35, 40, 37, 43, 38, 28],
  "23EG107F58": [37, 39, 44, 43, 39, 43, 43, 35],
  "23EG107F59": [38, 35, 41, 41, 41, 39, 42, 38],
  "23EG107F60": [31, 30, 42, 40, 42, 42, 41, 32],
  "23EG107F61": [34, 35, 43, 43, 45, 41, 44, 35],
  "23EG107F62": [38, 39, 48, 44, 43, 48, 42, 24],
  "23EG107F63": [44, 41, 50, 46, 45, 48, 49, 38],
  "24EG507F01": [35, 30, 42, 42, 45, 44, 39, 25],
  "24EG507F02": [31, 36, 38, 43, 47, 47, 37, 26],
  "24EG507F03": [35, 37, 39, 42, 37, 41, 41, 36],
  "24EG507F04": [21, 30, 41, 36, 45, 42, 30, 28],
  "24EG507F05": [34, 31, 39, 43, 37, 44, 40, 42],
};

const SPECIFIC_NAMES: { [key: string]: string } = {
  // --- SECTION A (01-66) ---
  "23EG107A01": "AARON JAMES",
  "23EG107A02": "ABDUL RAHEEM",
  "23EG107A03": "ABHINAV GUPTA",
  "23EG107A04": "ADARSH RAO",
  "23EG107A05": "ADITHYA VARMA",
  "23EG107A06": "ADITI SHARMA",
  "23EG107A07": "AISHWARYA LAXMI",
  "23EG107A08": "AJAY KUMAR",
  "23EG107A09": "AKHIL YADAV",
  "23EG107A10": "AKSHAY SINGH",
  "23EG107A11": "ALEKYA REDDY",
  "23EG107A12": "AMIT PATEL",
  "23EG107A13": "AMULYA RAO",
  "23EG107A14": "ANAND KRISHNA",
  "23EG107A15": "ANIKET MISHRA",
  "23EG107A16": "ANIL KUMAR",
  "23EG107A17": "ANISH REDDY",
  "23EG107A18": "ANJALI DEVI",
  "23EG107A19": "ANKIT SHARMA",
  "23EG107A20": "ANUSHA GOUD",
  "23EG107A21": "ARAVIND SWAMY",
  "23EG107A22": "ARCHANA RAO",
  "23EG107A23": "ARJUN REDDY",
  "23EG107A24": "ARUN KUMAR",
  "23EG107A25": "ARVIND KRISHNA",
  "23EG107A26": "ASHISH KUMAR",
  "23EG107A27": "ASHWINI REDDY",
  "23EG107A28": "AVINASH GOUD",
  "23EG107A29": "AYUSH SHARMA",
  "23EG107A30": "BALAJI RAO",
  "23EG107A31": "BALU YADAV",
  "23EG107A32": "BHARATH KUMAR",
  "23EG107A33": "BHARGAV REDDY",
  "23EG107A34": "BHAVANA LAXMI",
  "23EG107A35": "BHAVYA SRI",
  "23EG107A36": "BINDU MADHAVI",
  "23EG107A37": "CHAITANYA KRISHNA",
  "23EG107A38": "CHANDRA SHEKAR",
  "23EG107A39": "CHARAN TEJA",
  "23EG107A40": "CHETAN KUMAR",
  "23EG107A41": "CHINMAYI RAO",
  "23EG107A42": "DEEKSHITH REDDY",
  "23EG107A43": "DEEPAK KUMAR",
  "23EG107A44": "DEEPIKA RANI",
  "23EG107A45": "DEVENDER GOUD",
  "23EG107A46": "DHANUSH YADAV",
  "23EG107A47": "DHEERAJ KUMAR",
  "23EG107A48": "DIVYA SREE",
  "23EG107A49": "DURGA PRASAD",
  "23EG107A50": "ESHWAR RAO",
  "23EG107A51": "GANESH KUMAR",
  "23EG107A52": "GAYATHRI DEVI",
  "23EG107A53": "GEETHA RANI",
  "23EG107A54": "GIRISH KUMAR",
  "23EG107A55": "GOPI KRISHNA",
  "23EG107A56": "GOWTHAM REDDY",
  "23EG107A57": "HARI KRISHNA",
  "23EG107A58": "HARIKA REDDY",
  "23EG107A59": "HARISH KUMAR",
  "23EG107A60": "HARSHITHA RAO",
  "23EG107A61": "HEMANTH KUMAR",
  "23EG107A62": "HIMABINDU K",
  "23EG107A63": "INDU PRIYA",
  "23EG107A64": "ISHWARIYA S",
  "23EG107A65": "JAGADISH KUMAR",
  "23EG107A66": "JAHNAVI REDDY",

  // --- SECTION B (01-66) ---
  "23EG107B01": "JAI HIND",
  "23EG107B02": "JAYANTH KUMAR",
  "23EG107B03": "JAYASREE K",
  "23EG107B04": "JEEVAN KUMAR",
  "23EG107B05": "JHANSI RANI",
  "23EG107B06": "JITHENDER GOUD",
  "23EG107B07": "JYOTHI LAXMI",
  "23EG107B08": "KALYAN RAM",
  "23EG107B09": "KAMAL HASAN",
  "23EG107B10": "KANAKA RAJU",
  "23EG107B11": "KARTHIK REDDY",
  "23EG107B12": "KAVYA SREE",
  "23EG107B13": "KEERTHI REDDY",
  "23EG107B14": "KISHORE KUMAR",
  "23EG107B15": "KRISHNA VENI",
  "23EG107B16": "KUMAR SWAMY",
  "23EG107B17": "KUSUMA KUMARI",
  "23EG107B18": "LAKSHMI PRASANNA",
  "23EG107B19": "LALITHA DEVI",
  "23EG107B20": "LAVANYA REDDY",
  "23EG107B21": "LIKHITH KUMAR",
  "23EG107B22": "LOKESH YADAV",
  "23EG107B23": "MADHAVI LATHA",
  "23EG107B24": "MADHU SUDHAN",
  "23EG107B25": "MAHESH BABU",
  "23EG107B26": "MAHITHA REDDY",
  "23EG107B27": "MALLIKARJUN",
  "23EG107B28": "MAMATHA RAO",
  "23EG107B29": "MANASA VEENA",
  "23EG107B30": "MANDEEP SINGH",
  "23EG107B31": "MANIKANTA",
  "23EG107B32": "MANISH GOUD",
  "23EG107B33": "MANOJ KUMAR",
  "23EG107B34": "MANASA REDDY",
  "23EG107B35": "MEGHANA RAO",
  "23EG107B36": "MOHAN KRISHNA",
  "23EG107B37": "MOUNIKA REDDY",
  "23EG107B38": "MUKESH KUMAR",
  "23EG107B39": "MURALI KRISHNA",
  "23EG107B40": "NARESH YADAV",
  "23EG107B41": "NAVEEN KUMAR",
  "23EG107B42": "NAVYA SREE",
  "23EG107B43": "NEERAJ KUMAR",
  "23EG107B44": "NEHA SHARMA",
  "23EG107B45": "NIKHIL REDDY",
  "23EG107B46": "NISHANTH KUMAR",
  "23EG107B47": "NITHIN GOUD",
  "23EG107B48": "NITYA SREE",
  "23EG107B49": "OMKAR REDDY",
  "23EG107B50": "PALLAVI RAO",
  "23EG107B51": "PAVAN KALYAN",
  "23EG107B52": "PHANI KUMAR",
  "23EG107B53": "POOJA HEGDE",
  "23EG107B54": "PRABHAS RAJU",
  "23EG107B55": "PRADEEP KUMAR",
  "23EG107B56": "PRAMOD REDDY",
  "23EG107B57": "PRANAVI K",
  "23EG107B58": "PRANAY KUMAR",
  "23EG107B59": "PRASAD RAO",
  "23EG107B60": "PRASANNA KUMAR",
  "23EG107B61": "PRATEEK REDDY",
  "23EG107B62": "PRAVALIKA G",
  "23EG107B63": "PRAVEEN KUMAR",
  "23EG107B64": "PREETHI REDDY",
  "23EG107B65": "PRITAM SINGH",
  "23EG107B66": "PRIYANKA RAO",
  
  // Specific override for Lateral Entry/Others if needed
  "22EG507A03": "SURESH RAINA",
};

const FIRST_NAMES = ["GHANTA", "KATAKAM", "MEKALA", "CHINTHALA", "BODDU", "PAGIDIPALLI", "KOTHA", "MUPPALA", "VEMULA", "NALLA", "ADDEPALLI", "BOMMIDI", "CHILLA", "DASARI", "EGURLA", "GANGULA", "HIMANSHU", "ISLAVATH", "JONNALA", "KUMARI", "SUNKARA", "PILLI", "MARELLA", "KODALI", "VARMA"];
const MIDDLE_NAMES = ["NIKHIL", "VARSHITHA", "SAI", "KRISHNA", "RAJESH", "HARINI", "SRAVANI", "PAVAN", "VIVEK", "ANUSHA", "SHARATH", "BINDHU", "KIRAN", "NAVYA", "DEVI", "PRASAD", "CHANDRA", "MADHAVI", "SANTOSH"];
const LAST_NAMES = ["CHOWDHARY", "REDDY", "GOUD", "RAO", "YADAV", "NAIDU", "KUMAR", "LAXMI", "SHARMA", "VERMA", "DUBEY", "SINGH", "PATHAK", "KAUR", "BANO", "REDDI", "LENKA", "DAS"];

const SEMESTER_COURSES: { [key: number]: { code: string; name: string; credits: number }[] } = {
  1: [
    { code: 'A51001', name: 'Mathematics-I', credits: 4.0 },
    { code: 'A51006', name: 'Applied Physics', credits: 4.0 },
    { code: 'A51004', name: 'Programming for Problem Solving- I', credits: 2.0 },
    { code: 'A51007', name: 'Basic Electrical Engineering', credits: 3.0 },
    { code: 'A51227', name: 'Applied Physics Lab', credits: 1.5 },
    { code: 'A51228', name: 'Programming for Problem Solving- I Lab', credits: 1.5 },
    { code: 'A51229', name: 'Basic Electrical Engineering Lab', credits: 1.0 },
    { code: 'A51230', name: 'Engineering Workshop', credits: 1.5 },
    { code: 'A51231', name: 'English Communication Skills Lab', credits: 1.0 },
  ],
  2: [
    { code: 'A52001', name: 'Mathematics-II', credits: 4.0 },
    { code: 'A52008', name: 'English', credits: 2.0 },
    { code: 'A52009', name: 'Engineering Chemistry', credits: 4.0 },
    { code: 'A52003', name: 'Programming for Problem Solving-II', credits: 2.0 },
    { code: 'A52225', name: 'Engineering Graphics Lab', credits: 2.5 },
    { code: 'A52226', name: 'English Language Skills Lab', credits: 1.0 },
    { code: 'A52227', name: 'Engineering Chemistry Lab', credits: 1.5 },
    { code: 'A52228', name: 'Programming for Problem Solving – II Lab', credits: 1.5 },
  ],
  3: [
    { code: 'A53029', name: 'Computer Systems I', credits: 3.0 },
    { code: 'A53025', name: 'Data Structures', credits: 3.0 },
    { code: 'A53026', name: 'Python Programming', credits: 2.0 },
    { code: 'A54030', name: 'Fundamentals of Software Engineering', credits: 3.0 },
    { code: 'A53030', name: 'Probability and Statistics', credits: 3.0 },
    { code: 'A53031', name: 'Java Programming', credits: 3.0 },
    { code: 'A53217', name: 'Python Programming Lab', credits: 1.5 },
    { code: 'A53218', name: 'Data Structures & Java Lab', credits: 1.5 },
    { code: 'A53007', name: 'Environmental Studies', credits: 0.0 },
  ],
  4: [
    { code: 'A54028', name: 'Data Wrangling and Visualization', credits: 3.0 },
    { code: 'A54026', name: 'Design and Analysis of Algorithms', credits: 4.0 },
    { code: 'A54029', name: 'Fundamentals of Artificial Intelligence', credits: 3.0 },
    { code: 'A53027', name: 'Discrete Mathematics', credits: 3.0 },
    { code: 'A54027', name: 'Data Base Management Systems', credits: 3.0 },
    { code: 'A54220', name: 'Soft Skills for Success Lab', credits: 1.0 },
    { code: 'A54221', name: 'Data Wrangling and Visualization Lab', credits: 1.5 },
    { code: 'A54222', name: 'Data Base Management Systems Lab', credits: 1.5 },
    { code: 'A54022', name: 'Gender Sensitization', credits: 0.0 },
  ],
  5: [
    { code: 'A55001', name: 'EML', credits: 4.0 },
    { code: 'A55002', name: 'CS-II', credits: 4.0 },
    { code: 'A55003', name: 'WPM', credits: 3.0 },
    { code: 'A55004', name: 'ED', credits: 3.0 },
    { code: 'A55201', name: 'CS LAB', credits: 1.5 },
    { code: 'A55202', name: 'WPM LAB', credits: 1.5 },
    { code: 'A55203', name: 'EML LAB', credits: 1.5 },
    { code: 'A55204', name: 'QAR', credits: 1.5 },
  ]
};

const getGradeFromMarks = (marks: number) => {
  if (marks >= 45) return 'O';
  if (marks >= 40) return 'A+';
  if (marks >= 35) return 'A';
  if (marks >= 30) return 'B+';
  if (marks >= 25) return 'B';
  if (marks >= 20) return 'C';
  return 'F';
};

const getRandomGrade = (canFail: boolean = false) => {
  const grades = canFail ? ['O', 'A+', 'A', 'B+', 'B', 'C', 'F'] : ['O', 'A+', 'A', 'B+', 'B', 'C'];
  return grades[Math.floor(Math.random() * grades.length)];
};

const generateStudentName = (index: number) => {
  const f = FIRST_NAMES[index % FIRST_NAMES.length];
  const m = MIDDLE_NAMES[(index + 3) % MIDDLE_NAMES.length];
  const l = LAST_NAMES[(index + 7) % LAST_NAMES.length];
  return `${f} ${m} ${l}`;
};

const generateSemesters = (studentIndex: number, hallticket: string): SemesterResult[] => {
  const semesters: SemesterResult[] = [];
  const upperHallticket = hallticket.toUpperCase();
  const internalData = INTERNAL_MARKS_MAPPING[upperHallticket];
  
  const rollSuffixStr = hallticket.slice(-2);
  const rollSuffix = parseInt(rollSuffixStr);
  const isEvenRoll = !isNaN(rollSuffix) && rollSuffix % 2 === 0;

  for (let sem = 1; sem <= 5; sem++) {
    const courses: CourseResult[] = SEMESTER_COURSES[sem].map((c, i) => {
      let grade = getRandomGrade();
      
      // Semester 5 (III-I) logic
      if (sem === 5) {
        if (internalData && i < internalData.length) {
          grade = getGradeFromMarks(internalData[i]);
          
          // STRICT OVERRIDE: Fail even rolls in 1st subject if not already failed (per requirements)
          if (isEvenRoll && i === 0 && grade !== 'F') {
            grade = 'F';
          }
        } else if (isEvenRoll) {
          if (i === 0) grade = 'F';
          else if (Math.random() > 0.8) grade = 'F';
        }
      }

      return {
        sNo: i + 1,
        courseCode: c.code,
        courseName: c.name,
        credits: c.credits.toFixed(2),
        grade: grade,
        status: grade === 'F' ? 'F' : 'P'
      };
    });

    const totalCredits = SEMESTER_COURSES[sem].reduce((acc, curr) => acc + curr.credits, 0);
    const securedCredits = courses.filter(c => c.status === 'P').reduce((acc, curr, idx) => acc + SEMESTER_COURSES[sem][idx].credits, 0);

    const gradePoints: { [key: string]: number } = { 'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'F': 0 };
    let totalGradePoints = 0;
    courses.forEach((c, idx) => {
      totalGradePoints += (gradePoints[c.grade] || 0) * SEMESTER_COURSES[sem][idx].credits;
    });
    
    const sgpaValue = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    const sgpa = sgpaValue.toFixed(2);

    semesters.push({
      semesterNumber: sem,
      courses,
      sgpa,
      securedCredits: securedCredits.toFixed(1),
      totalCredits: totalCredits.toFixed(1)
    });
  }
  return semesters;
};

const createMockDatabase = (): { [key: string]: Student } => {
  const db: { [key: string]: Student } = {};
  const sections = ['a', 'b', 'c', 'd', 'e', 'f'];
  let studentCount = 0;

  // 1. Generate the standard 01-66 range for all sections
  sections.forEach(sec => {
    for (let i = 1; i <= 66; i++) {
      const rollSuffix = i.toString().padStart(2, '0');
      const roll = `23eg107${sec}${rollSuffix}`;
      const semesters = generateSemesters(studentCount, roll);
      const avgSgpa = semesters.reduce((acc, s) => acc + parseFloat(s.sgpa), 0) / semesters.length;
      
      let studentName = SPECIFIC_NAMES[roll.toUpperCase()];
      if (!studentName) {
        studentName = generateStudentName(studentCount);
      }

      db[roll.toLowerCase()] = {
        hallticketNumber: roll.toUpperCase(),
        studentName: studentName,
        program: 'B TECH in Artificial Intelligence and Machine Learning',
        cgpa: avgSgpa.toFixed(2),
        semesters: semesters
      };
      studentCount++;
    }
  });

  // 2. Scan INTERNAL_MARKS_MAPPING for ANY students we missed 
  // (Lateral entries, readmits, or gaps that didn't fit the 01-66 loop perfectly)
  Object.keys(INTERNAL_MARKS_MAPPING).forEach(rollKey => {
    const lowerKey = rollKey.toLowerCase();
    if (!db[lowerKey]) {
      // This is a special roll number found in the PDF (e.g. 22EG507A03, 24EG507B01)
      const semesters = generateSemesters(studentCount, rollKey);
      let studentName = SPECIFIC_NAMES[rollKey];
      if (!studentName) studentName = generateStudentName(studentCount);

      db[lowerKey] = {
        hallticketNumber: rollKey,
        studentName: studentName,
        program: 'B TECH in Artificial Intelligence and Machine Learning', // Simplified for general display
        cgpa: (semesters.reduce((acc, s) => acc + parseFloat(s.sgpa), 0) / semesters.length).toFixed(2),
        semesters: semesters
      };
      studentCount++;
    }
  });

  return db;
};

export const MOCK_DATABASE = createMockDatabase();
