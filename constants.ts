
import { AppTab, TypingInstruction, TaskLog, ResearchResult, Comment } from './types';

// Pre-filled document content for "work-in-progress" look
export const INITIAL_EDITOR_TEXT = `Ⅰ. 사실관계

1. 본 사건의 의뢰인 A(이하 '의뢰인')는 2026년 3월 15일 상대방 B(이하 '상대방')와 '차세대 스마트 물류 시스템 공급 및 유지보수' 계약을 체결하였습니다.
2. 계약 내용에 따르면 상대방은 2026년 6월 30일까지 1차 모듈을 납품 완료하여야 하나, 현재까지 정당한 사유 없이 납품을 지체하고 있습니다.
3. 의뢰인은 수차례에 걸쳐 이행 독촉을 하였음에도 불구하고 상대방은 기술적 결함 및 인력 부족을 이유로 일방적인 일정 연기를 통보한 상황입니다.

Ⅱ. 주요 쟁점

1. 상대방의 납품 지체가 '불가항력적 사유'에 해당하는지 여부
2. 지체상금 산정의 기산점 및 산정 기준의 적정성
3. 계약 해지 및 원상회복 청구의 가능성 검토

Ⅲ. 검토

현재까지 확보된 자료에 따르면 상대방의 주장은 객관적인 증거가 부족합니다. `;

export const TASK_LOGS: TaskLog[] = [
  { id: 1, time: '10:12', content: '사실관계 초안 작성', completed: true },
  { id: 2, time: '10:45', content: '상대방 계약서 독소조항 분석', completed: true },
  { id: 3, time: '11:10', content: '쟁점 1: 불가항력 사유 판례 검토', completed: false },
  { id: 4, time: '11:35', content: '지체상금 산식 시뮬레이션', completed: false },
  { id: 5, time: '13:20', content: '의견서 최종 문구 보완', completed: false },
];

export const INITIAL_COMMENTS: Comment[] = [
  { id: 1, author: '김 변호사', text: '지체상금 요율이 일반적인 수준보다 높게 설정된 경위 파악 필요', time: '25분 전' },
  { id: 2, author: '이 파트너', text: '관련 판례 v0.7 참고해서 문언 정리할 것', time: '1시간 전' },
];

/**
 * Fix: Added missing RESEARCH_RESULTS export which was causing a compilation error in components/Research.tsx
 */
export const RESEARCH_RESULTS: ResearchResult[] = [
  {
    id: 1,
    title: '대법원 2024. 5. 30. 선고 2024다5562 판결 [지체상금]',
    source: '판례/대법원',
    summary: 'IT 용역 계약에서 하드웨어 공급 지연이 소프트웨어 개발 공정에 미치는 영향과 그에 따른 지체상금 감경 사유에 관한 법리 설시. 수급인의 기술적 역량 부족은 통상적인 위험 부담의 범위 내에 있으며 불가항력 사유로 인정되지 않음을 명시함.'
  },
  {
    id: 2,
    title: '서울고등법원 2025. 1. 15. 선고 2024나44123 판결 [손해배상(기)]',
    source: '판례/하급심',
    summary: '차세대 전산 시스템 구축 사업에서의 납품 지체와 관련하여, 발주처의 협력 의무 위반이 지체 기간 산정에 미치는 영향 분석. 전체 지체 기간 중 30%에 대해 발주처의 귀책 사유를 인정하여 지체상금을 제한함.'
  },
  {
    id: 3,
    title: '소프트웨어 용역 계약에서의 지체상금과 손해배상 예정',
    source: '학술지/법학연구',
    summary: '소프트웨어 개발 계약의 특수성을 고려한 지체상금 약정의 성격 규명. 대규모 국책 사업에서의 이행 지체에 대한 판례 경향과 위약벌 성격의 인정 여부에 관한 고찰.'
  }
];

// Phrase variations to avoid repetition in loops
export const VARIATIONS = {
  legal_reasoning: [
    "특히 대법원 2024다5562 판결의 취지에 비추어 볼 때, 채무불이행의 고의성이 명확히 인정될 가능성이 높습니다. ",
    "상대방의 기술적 결함 주장은 통상적인 예견 범위를 벗어난 것으로 보기 어려우며, 이는 채무자의 책임 영역에 해당합니다. ",
    "용어 정의의 명확성을 위해 '납품 지체'의 범위를 재확인하고, 관련 손해액 산정 시 실질적 영업 손실을 포함해야 합니다. ",
  ],
  closing: [
    "\n\nⅣ. 결론 및 향후 조치\n\n상대방에 대한 최후 통고서를 발송하고, 7일 이내에 이행이 없을 경우 즉각적인 계약 해지 절차를 밟는 것이 타당하다고 사료됩니다. ",
    "\n\nⅣ. 결론 및 향후 조치\n\n증거 자료를 추가 보완하여 소장 작성을 준비하되, 상대방의 합의 의사를 타진하는 전략을 병행할 필요가 있습니다. "
  ]
};

// Long behavioral script (approx 3-5 mins total flow)
export const SIMULATION_SCRIPT: TypingInstruction[] = [
  // 1. Start Editing in Section III
  { type: 'switch_tab', tab: AppTab.EDITOR },
  { type: 'pause', duration: 1500 },
  { type: 'scroll', y: 300 },
  { type: 'move', x: 450, y: 500 },
  { type: 'click' },
  { type: 'type', text: '특히 판례의 태도를 고려할 때, ' },
  { type: 'pause', duration: 1200 },
  { type: 'type', text: '상대방의 주장은 법리적으로 근거가 빈약합니다.' },
  { type: 'pause', duration: 800 },
  { type: 'toast', message: '자동 저장됨' },
  
  // 2. Revision: Select and replace a phrase
  { type: 'pause', duration: 1500 },
  { type: 'select', selectionRange: [420, 445] }, // Focus on "근거가 빈약합니다" or similar
  { type: 'pause', duration: 1000 },
  { type: 'delete', count: 9 },
  { type: 'type', text: '받아들여지기 어려울 것으로 보입니다.' },
  { type: 'pause', duration: 2000 },

  // 3. Add Comment
  { type: 'move', x: 900, y: 300 }, // Comment panel
  { type: 'click' },
  { type: 'comment', text: '상대방의 기술적 결함 입증 책임 관련 추가 리서치 필요' },
  { type: 'toast', message: '주석 추가됨' },
  { type: 'pause', duration: 1500 },

  // 4. Quick Research Break
  { type: 'move', x: 400, y: 35 },
  { type: 'click' },
  { type: 'switch_tab', tab: AppTab.RESEARCH },
  { type: 'pause', duration: 1000 },
  { type: 'move', x: 400, y: 155 },
  { type: 'click' },
  { type: 'type', text: 'IT 용역 지체상금 불가항력 면책 사유' },
  { type: 'pause', duration: 800 },
  { type: 'scroll', y: 400 },
  { type: 'pause', duration: 2000 },

  // 5. Back to Editor & Conclusion
  { type: 'move', x: 250, y: 35 },
  { type: 'click' },
  { type: 'switch_tab', tab: AppTab.EDITOR },
  { type: 'scroll', y: 800 },
  { type: 'move', x: 400, y: 800 },
  { type: 'click' },
  { type: 'version_up' },
  { type: 'pause', duration: 1000 },
  { type: 'type', text: VARIATIONS.closing[0] },
  { type: 'pause', duration: 3000 },

  // 6. Check Timesheet
  { type: 'move', x: 550, y: 35 },
  { type: 'click' },
  { type: 'switch_tab', tab: AppTab.TIMESHEET },
  { type: 'pause', duration: 1500 },
  { type: 'move', x: 140, y: 285 }, // Third task checkbox
  { type: 'click' },
  { type: 'pause', duration: 2000 },

  // Final wrap up for loop
  { type: 'move', x: 250, y: 35 },
  { type: 'click' },
  { type: 'switch_tab', tab: AppTab.EDITOR },
  { type: 'toast', message: '문서 검토 완료' },
  { type: 'pause', duration: 5000 },
];
