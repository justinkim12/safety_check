DROP DATABASE IF EXISTS esgmanagement;
DROP USER IF EXISTS manager@localhost;

create user manager@localhost identified WITH mysql_native_password  by 'manager';
create database esgmanagement;
grant all privileges on esgmanagement.* to manager@localhost with grant option;
commit;

USE esgmanagement;

CREATE TABLE Users (
  user_id VARCHAR(50) NOT NULL PRIMARY KEY,
  user_pw VARCHAR(50) NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  user_phone VARCHAR(20) ,
  user_email VARCHAR(50) NOT NULL,
  user_rank VARCHAR(20) 
);

CREATE TABLE Checklist (
  checklist_id VARCHAR(20) NOT NULL primary key,
  contents varchar(500),
  viewpoint varchar(500),
  main_dept varchar(100),
  related_dept varchar(100),
  result char(1),
  updated_date datetime,
  is_checked TINYINT default 0,
  reminder_cnt int default 0,
  is_reminder int default 0,
  rule_doc_id int,
  evid_doc_id int
);
ALTER TABLE Checklist modify result char(10);

CREATE TABLE Document (
  doc_id varchar(20) NOT NULL,
  doc_name varchar(100) NOT NULL,
  doc_link varchar(200) NOT NULL
);
ALTER TABLE Document ADD COLUMN doc_type varchar(20) NOT NULL;
ALTER TABLE Document ADD COLUMN updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP first;
alter table Document add constraint emp_pk primary key (updated_date);


CREATE TABLE Calender (
  schedule_id INTEGER NOT NULL primary key AUTO_INCREMENT,
  schedule_name varchar(100) NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  alert BOOL default 0,
  memo VARCHAR(100)
);


/* User 데이터 삽입 */
INSERT INTO Users VALUES('20010835', '12341234', '신웅택', '010-333-1340', 'qwerasdf@gmail.com', '3학년');

/* Checklist 데이터 삽입 */
/* 시스템 요소 4 */
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('4.1.1.', '조직은 조직의 목적 및 전략적 방향과 관련이 있는 외부 및 내부이슈 및 안전보건경영시스템의 의도된 결과를 달성하기 위한 조직의 능력에 영향을 주는 외부, 내부이슈를 결정하였는가?', '- 조직의상황, 내외부 이해관계자 및 리스크 기회 관리');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('4.1.2.', '변경 정보는 경영검토 내에 시스템적으로 나타내는가? 위험과 기회의 식별 및 적용범위의 정의에 대해 입력으로
고려되는가?', '- 안전보건 경영 매뉴얼');

INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('4.2.1.', '조직은 다음 사항을 결정하였는가?
- 안전보건 경영시스템에 관련된 이해관계자
- 이들 이해관계자의 기대와 관련된 요구
- 이들 요구와 기대 중 어떤 것이 준수의무가 될 것인가', '- 이해관계자의 니즈 및
기대 분석표');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('4.2.2.','근로자 및 내,외부 관계자를 모두 고려하였는가?','- 이해관계자의 니즈 및
기대 분석표');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('4.2.3.','변경 정보를 경영검토에 체계적으로 제출하였는가?','- 경영검토서');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('4.2.4.','니즈와 기대를 적용범위를 정의하고 위험과 기회를 파악하기위한 입력으로 고려하였는가?','- 이해관계자의 니즈 및
기대 분석표');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('4.3.1.','적용범위는 문서화되고 이해관계자에게 이용 가능한가?','- 안전보건 경영 매뉴얼');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('4.3.2.','모든 활동, 제품 및 서비스가 적용범위에 포함되는가?','- 안전보건 경영 매뉴얼');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('4.3.3.','적용범위를 결덩할 때, 조직은 다음사항과 같이 하는가?
- 4,1항과 관련된 외부 및 내부 이슈사항에 대한 고려
- 4.2 항과 관련된 요구사항에 대한 반영
- 계획되고 수행된 업무와 관련된 활동에 대한 반영','- 안전보건 경영 매뉴얼');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('4.3.4.','해당 적용범위는 문서화된 정보로 이용 가능 하는가?','- 안전보건 경영 매뉴얼');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('4.4.1.','조직은 국제 표준의 요구사항에 따라, 필요한 규정 및 그 규정 상호작용을 포함하여 안전보건경영시스템을 수립,','- 안전보건 경영 매뉴얼');

/* 시스템 요소 5 */
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('5.1.1.','최고경영자/최고경영진은 안전보건 경영시스템에 관한 리더십 및 실행의지를 어떻게 실증하는가?','- 안전보건 경영 매뉴얼');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('5.1.2.','그들은 안전보건MS에 관해 활동적이고 역할을 통솔하고 그들의 임무를 이해하고 효과적인 안전보건경영을 지원하고
촉진하는데 참여하는가?','- 안전보건 경영 매뉴얼');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('5.2.1.','안전보건 방침은 조직의 상황과 전략적 방향에 조화되는가?','- 안전보건 방침');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('5.2.2.','조직상황에 관련되는 기타 특정 의지와 상해, 직업병 및 오염예방을 포함하는 환경보호에 대한 의지를 포함하는가?','- 안전보건 방침');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('5.2.3.','안전보건 방침은 다음과 같이 해야 한다.
- 문서화된 정보로 이용 가능
- 조직 내 의사소통
- 적절하게 이해관계자에게 이용 가능
- 관련성 및 적절성','- 안전보건 방침');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('5.3.1.','최고경영자는 안전보건 경영시스템 내에 관련된 역할에 대한 책임 및 권한이 조직내 모든 계층에서 부여 및 전달되고, 문서화된 정보로써 유지되고 있음을 보장','- 안전보건 경영 매뉴얼');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('5.3.2.','조직의 각 계층의 근로자들은 그들이 관리하는 사항 전반에 대한 안전보건경영시스템의 해당 측면들에 대해 책임을 갖는가?','- 안전보건 경영 매뉴얼');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('5.3.3.','최고경영자는 다음을 위한 책임과 권한을 부여하는가?
- 안전보건 경영시스템이 본 문서의 요구사항에 적합함을 보장
- 최고경영자에게 안전보건 경영시스템의 성과에 대한 보고','- 안전보건 경영 매뉴얼');
INSERT INTO Checklist (checklist_id, contents, viewpoint,reminder_cnt) VALUES('5.4.1.','조직은 안전보건 경영시스템의 개선에 대한 개발, 기획, 실행, 성과 평가 및 조치하는데 모든 적용가능한 계층/기능에서
근로자 및 근로자 대표가 있는 경우, 근로자 대표자와 협의
및 참여를 위한 규정을 수립, 실행 및 유지하고 있는가?','- 안전보건 경영 매뉴얼',2);
INSERT INTO Checklist (checklist_id, contents, viewpoint,reminder_cnt) VALUES('5.4.2.','다음과 같은 비관리직 근로자들과 협의를 하는가?
- 이해관계자의 필요성(니즈) 및 기대를 결정
- 안전보건 방침 수립
- 적절하게 조직의 역할, 책임 및 권한에 대한 부여
- 법적 및 기타 요구사항을 충족하는 방법에 대한 결정
- 안전보건 목표 수립 및 달성하기 위한 기획
- 외주처리, 조달/계약자에 대한 적용 가능한 관리방법 결정
- 모니터링, 측정 및 평가가 필요한 사항들의 결정
- 심사 프로그램을 기획, 수립, 실행 및 유지
- 지속적 개선을 보장','- 안전보건 경영 매뉴얼
-협의체회의록',2);
INSERT INTO Checklist (checklist_id, contents, viewpoint,reminder_cnt) VALUES('5.4.3.','다음과 같이 사항에 비관리직 근로자들은 참여하고 있는가?
- 그들의 협의 및 참여를 위한 메커니즘 결
- 위험요인, 리스크 및 기회 평가 식별
- 위험요인을 제거하고 안전보건리스크 감소를 위한 조치 결정
- 요구 역량, 교육 필요성, 교육 및 효과성평가를 결정
- 의사소통 필요성 및 수행할 방법이 무엇인 지에 대한 결정
- 관리방법 조치, 그것의 효과적 실행 및 이용에 대한 결정
- 사건, 부적합에 대한 조사 및 시정조치의 결정','- 안전보건 경영 매뉴얼
-협의체회의록',2);

/* 시스템 요소 6 */
INSERT INTO Checklist (checklist_id, contents, viewpoint,reminder_cnt) VALUES('6.1.1.1.','안전보건 경영시스템을 기획 시, 4.1항에 언급된 이슈와 4.2 항 및 4.3항에 언급된 요구사항을 고려하고 다음과 같이 다루어야할 필요가 있는 리스크 및 기회를 결정하는가?
- 안전보건 경영시스템이 의도된 결과를 달성할 수 있음을
보장
- 원치 않는 영향을 예방 혹은 감소
- 지속적 개선 달성','안전보건 리스크 및 기회
평가서',2);
INSERT INTO Checklist (checklist_id, contents, viewpoint,reminder_cnt) VALUES('6.1.1.2.','다루어야 할 의도된 결과와 안전보건 경영시스템의 리스크 및 기회를 결정할 때, 조직은 다음사항을 반영하는가?
- 환경측면 및 위험요인
- 안전보건 리스크와 기타 리스크
- 안전보건 기회와 기타 기회
- 법적 요구사항 및 기타 요구사항','안전보건 리스크 및 기회
평가서',2);
INSERT INTO Checklist (checklist_id, contents, viewpoint,reminder_cnt) VALUES('6.1.1.3.','조직은 기획 규정에서 조직, 조직의 규정 또는 안전보건경영시스템에서의 변경사항과 연관된 안전보건경영시스템의 의도된 결과와 관련된 기회와 리스크를 파악하고 평가하는가?','-안전보건 리스크 및 기회평가서
-중요리스크 및 기회개선계획서
-개선계획서성과평가표
-개선완료보고서',2);
INSERT INTO Checklist (checklist_id, contents, viewpoint,reminder_cnt) VALUES('6.1.1.4.','조직은 다음사항에 대해 문서화된 정보를 유지하고 있는가?
- 리스크 및 기회
- 조직의 리스크 및 기회를 다루고 결정하는데 요구되는 규
정과 조치 및 “높은 수준” 위험과 기회는 결정','-안전보건 리스크 및 기회 평가서
-중요리스크 및 기회개선계획서
-개선계획성과평가표
-개선완료보고서',2);
INSERT INTO Checklist (checklist_id, contents, viewpoint,reminder_cnt) VALUES('6.1.1.5.','규정은 기회에 초점을 포함하는가?','안전보건 관련 규정',2);
INSERT INTO Checklist (checklist_id, contents, viewpoint,reminder_cnt) VALUES('6.1.1.6.','규정이 수행된 것에 대하여 신뢰를 주기 위한 문서화된 정보가 이용 가능한가?','인쇄본 또는 프로그램 서버',2);
INSERT INTO Checklist (checklist_id, contents, viewpoint,reminder_cnt) VALUES('6.1.1.7.','잠재적인 응급상황은 식별되고 문서화되는가?','비상 계획서 및 비상 시나리오',2);
INSERT INTO Checklist (checklist_id, contents, viewpoint,reminder_cnt) VALUES('6.1.2.1.','위험요인 파악 및 위험성평가 시에 다음을 고려하는가?
- 조직은 일상 및 비일상 작업에 대해나 평가
- 조직은 “광범위 시각” 관점을 이해 및 적용성의 증거
- 작업장 내는 물론 작업장 밖의 활동을 모두 포함
- 리스크 및 기회를 모두 고려','위험성 평가서',2);
INSERT INTO Checklist (checklist_id, contents, viewpoint,reminder_cnt) VALUES('6.1.2.2.','중요한 위험요인을 결정하기 위해 사용하는 기준은 문서화 되어있는가?','위험성 평가서',2);
INSERT INTO Checklist (checklist_id, contents, viewpoint,reminder_cnt) VALUES('6.1.2.3.','사전 예방적인 방식으로 발생되는 위험요인을 파악하기 위한 규정을 수립,실행 및 유지하는가?
- 업무의 조직화된 방법, 사회적 요소, 조직 내 리더십, 문화
- 일상적 또한 비일상적 활동 및 상황
- 비상상황 및 그 원인을 포함 조직의 내,외부의 과거 사건
- 잠재적인 비상 상황
- 근로자, 계약자(도급업체), 방문객 및 기타 모든 인원
- 조직 활동에 영향을 받는 작업장 부근에 있는 인원
- 조직의 직접적 관리하에 있지 않은 위치에 있는 근로자
- 조직, 운영, 규정, 활동 및 안전보건 경영 시스템에 대한 실질적 혹은 제안된 변경
- 위험요인에 대한 정보 및 지식의 변경','위험성 평가서',2);
INSERT INTO Checklist (checklist_id, contents, viewpoint,reminder_cnt) VALUES('6.1.2.4.','안전보건 리스크 및 기회 평가는 실시하고 기록을 유지하는가','리스크기회 평가서',2);
INSERT INTO Checklist (checklist_id, contents, viewpoint,reminder_cnt) VALUES('6.1.3.1.','조직은 다음에 대한 규정을 수립, 실행 및 유지하는가?
- 위험요인과 안전보건 리스크, 안전보건 경영시스템에 적용가능한
준수의무를에 대해 최신 정보 유지, 결정 및 접근
- 적용되는 준수의무가 의사소통 되어야 하는 가를 결정
- 문서화된 정보로 유지 및 최신 정보로 유지','안전보건 법규 등록부 / 준수 평가서',2);
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'6.1.4.1.','조직은 다음과 같은 사항을 조치하기 위한 기획을 하는가?
- 리스크 및 기회를 결정
- 법적 요구사항 및 기타 요구사항에 대한 결정
- 비상 상황에 대한 대비 및 대응','중요 리스크 및 기회 개선계획서');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2, '6.1.4.2.','조직은 다음과 같은 사항을 조치 방법을 기획을 하는가?
- 개선 조치가 안전보건 경영시스템 규정 및 기타 비즈니스
규정에 통합 및 실행
- 이러한 조치들의 효과성 평가.','중요 리스크 및 기회 개선계획서');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('6.2.1.1.','조직은 관련된 기능 및 계층에서 안전보건 목표를 수립하는가?','안전보건 목표 및 세부목표');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('6.2.1.2.','안전보건 목표는 조직의 중대한 위험요인 안전보건 목표, 그 준수의무사항 및 리스크와 기회를 고려하는가?','안전보건 목표 및 세부목표');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('6.2.1.3.','목표는 조직의 상황과 전략적 방향에 조화되는가?','안전보건 목표 및 세부목표');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('6.2.1.4.','각 기능, 계측별로 수립된 안전보건 목표는 다음이 포함되는가?
- 안전보건 방침과 일관성
- 측정 가능
- 모니터링
- 의사소통
- 해당되는 경우, 업데이트','안전보건 목표 및 추진계획');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('6.2.2.1.','조직의 안전보건 목표를 달성하는 방법을 기획 시에, 조직은다음 사항을 결정하고 있는가?
- 무엇을 할 것인가
- 어떤 자원이 필요한가
- 누가 책임질 것인가
- 언제 완료될 것인가
- 모니터링을 위한 지표를 포함, 결과는 어떻게 평가할 것인가','안전보건 목표 및 추진계획');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('6.2.2.2.','안전보건 목표를 달성하기 위한 조치들이 어떻게 조직의 비즈니스 규정에 통합할 것인가?','안전보건 목표 관리 규정');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('6.2.2.3.','조직은 안전보건 목표 및 이를 달성하기 위한 계획에 대해 문서화된 정보를 유지하고 보유하는가?','안전보건 목표 및 추진계획');

/* 시스템 요소 7 */
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('7.1.1.','조직은 안전보건 경영시스템의 수립, 실행, 유지, 및 지속적 개선을 위해 필요한 자원들을 결정하고 제공하고 있는가?','안전보건 경영 매뉴얼');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'7.2.1.','조직은 다음 사항을 실행하고 있는가?
- 조직의 안전보건 성과에 영향을 미칠 수 있거나, 미치는 근로자의 필요한 역량을 결정
- 근로자들이 적절한 교육훈련 및 경험을 토대로 적격 보장
- 적용되는 경우, 필요한 역량 획득 및 유지하기 위한 조치 및 그 조치에 대한 효과성을 평가
- 역량의 증거로써 적절한 문서화된 정보 보유','적격성 관리 기준 및 평가표');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2, '7.2.2.','조치는 교육훈련의 제공, 멘토링, 최근 고용된 인원에 대하여
재배치 및 적격한 인원에 대한 계약 및 채용을 포함하는가?','교육 계획서/ 교육 기록표');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('7.3.1.','근로자들이 다음을 인식하도록 관리하는가?
- 안전보건 방침 및 안전보건 목표
- 개선된 안전보건 성과 유익을 포함, 안전보건 경영시스템의 효과성에 대한 그들의 기여도
- 안전보건 경영시스템 요구사항을 준수하지 않는 잠재적인 결과
- 근로자와 관련된 사건 및 조사의 결과
- 근로자 관련 환경측면, 위험요인, 안전보건 리스크, 결정된 조치
- 근로자 생명이나 건강에 긴박하고 심각한 위험의 존재 및 업무 상황으로부터 벗어난 부당한 결과로부터 보호','안전보건 경영 매뉴얼');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('7.4.1.1.','조직은 안전보건 경영시스템에 관한 내,외부 의사소통에 필요한 규정을 수립하고 실행하는가?','안전보건 의사소통 관리규정');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('7.4.1.2.','의사소통 규정에는 다음사항이 포함되어 있는가?
- 무엇에 대해 의사소통 할 것인가
- 언제 의사소통 할 것인가
- 누구와 의사소통 할 것인가
- 어떻게 의사소통 할 것인가','안전보건 의사소통 관리규정');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('7.4.1.3.','조직의 의사소통의 필요성을 고려할 때, 조직은 준수 의무 및 다양한 안전보건 측면을 반영하고 있는가?','안전보건 의사소통 관리규정');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('7.4.1.4.','조직의 의사소통 규정을 수립할 때, 다음을 수행하는가?
- 조직의 준수의무(법적 요구사항 및 기타 요구사항)을 반영
- 의사소통 되는 안전보건 정보는 안전보건 경영시스템 내에 생성되는 정보와 일관성이 있고 신뢰할 수 있다는 것을 보장','안전보건 의사소통 관리규정');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('7.4.1.5.','조직 의사소통 증거로 적절한 문서화된 정보로 보유하는가?','안전보건 의사소통 관리대장');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('7.4.1.내부.1.','의사소통 규정은 지속적 개선을 위한 공헌을 위하여 종업원 또는 외부와 가능한가?','안전보건 의사소통 관리규정');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('7.4.1.외부.1.','조직의 의사소통 규정에 의해 수립되고, 준수의무에서 요구되는 바와 같이 안전보건경영시스템과 관련된 정보에 대해 외부의사소통 하는가?','안전보건 의사소통 관리규정');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('7.5.1.1.','조직의 안전보건 경영시스템은 다음을 포함하는가?
- 본 문서에서 요구되는 문서화된 정보
- 안전보건 경영시스템의 효과성을 위해 필요하다고 조직에 의해 결정된 문서화된 정보','안전보건 문서화된 정보관리 규정');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('7.5.2.1.','문서화된 정보를 작성하거나 갱신할 때, 조직은 다음과 같이 적절히 수행됨을 보장하는가?
- 문서 식별 및 서술 (예: 제목, 날짜, 작성자, 문서 번호)
- 형식 (예: 언어, 소프트웨어 버전, 그래픽) 및 매체
- 적절성과 충족성을 위한 검토 및 승인','안전보건 문서화된 정보관리 규정');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('7.5.3.1.','안전보건 경영시스템과 본 문서에 의해 요구된 문서화된 정보는 다음을 보장할수 있도록 관리되는가?
- 필요한 장소와 시간에 사용 가능하고 사용하기에 적절함
- 충분하게 보호됨','안전보건 문서화된 정보관리 규정');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('7.5.3.2.','문서화된 정보의 관리를 위해 조직은 적절하게 다음 활동을 다루고 있는가?
- 배포, 접근, 검색과 사용
- 가독성의 보존을 포함한 보관과 보존
- 변경 관리 (예: 버전 관리)
- 보유와 폐','안전보건 문서화된 정보관리 규정');

/* 시스템 요소 8 */
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'8.1.1.1.','안전보건 경영시스템요구사항에 적합하고 6.1항과 6.2항에 명시된 조치사항을 실행하기 위해 필요한 규정을 다음과 같이 수립, 실행하고 관리 및 유지하는가?
- 규정(들)에 대한 운영기준 수립
- 운영기준에 따라 규정(들) 관리의 실행
- 근로자의 업무에 대한 적응','안전보건 관리 규정');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'8.1.1.2.','외주 처리된 규정의 관리 및 조직의 영향력 하에 있음을 보장하고, 규정에 적용되는 형태와 관리수준 및 영향력의 형태는 안전보건경영시스템내에서 정의되는가?','안전보건 관리 규정');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'8.1.1.3.','공정 전 과정 관점과 일관되게 조직은 다음을 수행하는가?
- 해당되는 경우, 조직 안전보건 경영시스템은 전과정의 각 단계를 고려하여 제품과 서비스에 대해 설계 및 개발 규정에서 다루어지는 것을 보장하도록 관리체계를 수립
- 해당되는 경우, 제품과 서비스 조달을 위한 안전보건 요구사항들을 결정
- 계약자를 포함, 외부 제공자에게 관련된 조직의 안전보건 요구사항을 의사소통
- 조직의 제품과 서비스의 운반이나 배달, 사용, 사용기간이 지난 제품의 처리 그리고 최종적 폐기와 관련된 잠재적인 중대한 안전보건 영향에 대한 정보를 제공할 필요성을 고려','안전보건 관리 규정');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'8.1.1.4.','규정이 계획 대로 수행되었다는 것에 대한 확신을 위해 필요한 정도까지 문서화된 정보를 유지하는가?','안전보건 관리 규정');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'8.1.2.1.','조직은 다음과 같은 “관리방법의 우선순위”를 활용, 안전보
건 위험 요인제거 및 안전보건리스크 감소를 위한 규정수립, 실행 및 유지하는가?
- 안전보건 위험요인 제거
- 덜 유해한 규정, 운용, 재료 또는 장비로 대체
- 공학적 관리방법 사용 및 업무 재 조직
- 교육훈련을 포함하여 행정적인 관리방법 사용
- 적절한 개인 보호장비 사용','안전보건 관리 규정');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'8.1.3.1.','조직은 안전보건 성과에 영향을 미치는 계획된 일시적, 영구적인 변경의 실행 및 관리를 위한 규정을 수립하는가?
- 신규 제품, 서비스 및 규정, 또는 기존 제품, 서비스 및 규정 변경(조직, 주변환경, 장비, 인력수급, 작업여건)','변경 제안서 / 변경 검토서');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2, '8.1.3.2.','- 법적 요구사항 및 기타 요구사항에 대한 변경
- 안전보건 위험요인 및 안전보건 리스크에 대한 지식 및 정보의 변경
- 지식 및 기술에 대한 개발','변경 제안서 / 변경 검토서');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'8.1.3.3.','조직은 필요에 따라 모든 역효과를 완화하기 위해 취한 조치 및 의도되지 않은 변경의 결과를 검토하는가?','변경관리 규정');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'8.1.4.1.','조직은 안전보건 경영시스템에 적합함을 보장하기 위해 서비스 및 제품조달을 관리하는 규정을 수립, 실행 및 유지하는가?','안전보건 경영 매뉴얼');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'8.1.4.2.','조직은 다음이 발생되는 안전보건 위험요인 파악하고 안전보건 리스크 평가 및 관리하기 위하여 조직의 계약자와 조달 규정을 조정하는가?
- 조직에 영향을 미치는 계약자(도급업체)의 활동과 운용
- 계약자의 근로자에게 영향을 미치는 조직의 활동 및 운용
- 작업장에 이해관계자에게 영향을 미칠 계약자 활동, 운용','협력업체 안전보건 관리 지침');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'8.1.4.3.','조직은 안전보건 경영시스템의 요구사항이 계약자 및 계약 근로자에 의해 충족된다는 것을보장하고, 조직의 조달 규정은 계약자 선정을 위한 안전보건관리기준을 규정하고 적용하는가?','협력업체 안전보건 관리 지침');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'8.1.4.4.','조직은 외주처리된 기능과 규정이 관리됨을 보장하고, 외주처리되는 방식이 법적요구사항 및 기타요구사항과 일관되고 안전보건경영시스템의 의도된결과를 달성할 수 있도록 보장하며, 기능과 규정에 적용되는 형태와 관리정도는 안전보건경영시스템내에서 규정되어 있는가?','협력업체 안전보건 관리 지침');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'8.2.1.','조직은 다음을 포함하여 6.1.2 항에 파악된 잠재적 비상사태에 대응에 필요한 규정을 수립, 실행 및 유지하는가?
- 응급처치의 제공을 포함한 비상사태에 대한 대응계획 수립
- 계획된 대응에 대한 교육훈련 제공
- 계획된 비상대응 능력에 대한 주기적인 테스트 및 훈련
- 테스트 이후, 특히 비상사태 발생 이후를 포함하여 필요에 따라 계획된 비상 대응을 수정하고 성과를 평가
- 모든 근로자에게 그들 의무와 책임에 대한 관련 정보 제공 및 의사소통
- 적절하게 계약자, 방문객, 비상 대응 서비스, 정부 기관 및
지역 단체에게 관련 정보에 대한 의사소통
- 계획된 대응의 개발 단계에서 적절하게 모든 관련된 이해
관계자의 개입 보장 및 그들의 필요성과 능력을 반영','- 비상 계획서
- 비상시나리오
- 비상훈련결과보고서
- 비상훈련성과평가표');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'8.2.2.','조직은 잠재적 비상사태에 대응하는 계획, 규정에 대한 문서화된 정보를 유지 및 보유하는가?','- 비상 계획서
- 비상훈련결과보고서
- 비상훈련성과평가표');

/* 시스템 요소 9 */
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'9.1.1.1.','조직은 모니터링, 측정, 분석 및 성과 평가를 위한 규정을 수립,실행, 및 유지하는가?','모니터링 및 성과측정 계획서');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'9.1.1.2.','조직은 다음을 결정하고 실행하는가?
- 다음을 포함하여 모니터링 및 측정이 필요한 대상
1) 법적 요구사항 및 기타 요구사항을 충족하는 정도
2) 파악된 안전보건 위험요인, 리스크 및 기회와 관련된 조직 활동 및 운용
3) 조직의 안전보건목표 달성을 향한 진행 정도
4) 운용 및 기타 관리 방법의 효과성','모니터링 및 성과측정 계획서');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'9.1.2.1.','조직은 법적 요구사항 및 기타 요구사항에 대한 준수를 평가하기 위한 규정을 수립, 행 및 유지하는가?','안전보건 법규 등록부 / 준수 평가서');
INSERT INTO Checklist (reminder_cnt, checklist_id, contents, viewpoint) VALUES(2,'9.1.2.2.','조직은 다음을 수행하고, 결과를 내,외부에 의사소통 하는가?
- 준수 평가에 대한 주기 및 방법에 대한 결
- 준수 평가 및 필요한 경우 조치 취함
- 법적 요구사항 및 기타 요구사항에 대한 준수 상태의 지식과 이해도 유지
- 준수평가 결과에 대한 문서화된 정보 보유','안전보건 법규 등록부 / 준수 평가서');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('9.2.1.1.','조직은 안전보건 경영시스템이 다음과 같은 정보를 제공하기 위해 계획된 주기로 내부심사를 수행하는가?
- 다음에 적합한 지의 여부
1) 조직의 안전보건 방침 및 안전보건 목표를 포함, 조직의 안전보건경영시스템에 대한 조직의 자체 요구사항
2) 본 문서에 대한 요구사항
- 효과적으로 실행되고 유지되는지 여부','안전보건 내부심사 규정');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('9.2.2.1.','조직은 다음과 같이 관리하고 실행하는가?
- 관련되는 규정들의 중요성 및 이전심사들의 결과들을 반영하고 빈도, 방법, 책임, 협의, 기획 요구사항 및 보고를 포함한 심사 프로그램을 계획, 수립, 실행 및 유지
- 각 심사에 대한 심사기준 및 범위를 규정
- 심사규정의 독립성과 객관성을 보장하기 위한 심사원 선정 및 심사를 수행
- 심사 결과가 관련 관리자에게 보고됨을 보장
- 관련된 심사 결과가 관련된 근로자, 근로자 대표가 있는 경우, 근로자의 대표자 및 기타 관련 이해관계자에게 보고된다는 것을 보장
- 부적합 표명에 대한 적절한 조치 및 조직의 안전보건 성과에 대한 지속적으로 개선','- 연간 내부심사 수행 계획서
- 내부심사계획서
- 시정조치요청서');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('9.2.2.2.','심사 프로그램 및 심사 결과에 대한 실행의 증거로써 문서화 된 정보를 보유하는가?','내부심사 결과 보고서');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('9.3.1.','최고경영자는 조직의 지속적인 적절성, 충족성 및 효과성을 보장하기 위해 계획된 주기로 안전보건경영시스템을 검토하는가?','안전보건 경영검토 규정');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('9.3.2.','경영검토는 다음을 고려하여 실행하는가?
- 이전 경영검토의 조치 상태
- 다음과 같은 사항을 포함, 안전보건경영시스템과 관련된 내부 및 외부 이슈사항에 대한 변경
1) 고객만족 및 이해관계자의 필요성(니즈)과 기대
2) 준수의무사항(법적 요구사항 및 기타 요구사항)
3) 리스크 및 기회
- 안전보건 방침 및 안전보건 목표가 충족되고 있는지 정도
- 다음의 경향을 포함한 안전보건 성과에 관한 정보
1) 사건, 부적합과 시정조치 및 지속적 개선
2) 모니터링 및 측정 결과
3) 법적 요구사항 및 기타 요구사항에 대한 준수평가 결과
4) 심사 결과
5) 근로자의 협의 및 참여
6) 리스크 및 기회
- 효과적인 안전보건 경영시스템 유지하기 위한 자원의 충족성
- 이해관계자와 관련된 의사소통
- 지속적 개선을 위한 기회;','안전보건 경영검토 보고서');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('9.3.3.','경영검토의 출력사항은 다음과 관련된 결정을 포함하는가?
- 조직의 의도된 결과를 달성하기 위한 안전보건 경영 시스템의 지속적인 적절성, 충족성 및 효과성
- 지속적 개선 기회
- 안전보건 경영시스템에 대한 변경의 필요성
- 필요한 자원
- 필요한 경우, 조치
- 다른 비즈니스 규정과 함께 안전보건 경영시스템의 통합을 개선하기 위한 기회
- 조직의 전략적인 방향을 위한 모든 영향','안전보건 경영검토 보고서');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('9.3.4.','최고경영자는 경영검토의 관련 출력사항을 근로자 및 대표가 있는 경우, 근로자 대표자에게 의사소통하고, 경영검토 결과의 증거로써 문서화된 정보를 보유하고 있는가?','안전보건 경영검토 보고서');

/* 시스템 요소 10 */
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('10.1.1.','조직은 안전보건 경영시스템의 의도된 결과를 달성하기 위해 개선을 위한 기회를 결정하고 필요한 조치를 실행하는가?','시정조치 규정');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('10.2.1.','조직은 사건 및 부적합을 다루고 결정하기 위해 보고, 조사 및 조치를 포함하여 규정을 수립, 실행 및 유지하는가?','시정조치 규정');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('10.2.2.','조직은 사건 및 부적합 발생 시에, 다음과 같이 실행하는가?
- 사건, 부적합에 적기에 대응 및 다음과 같이 적절한 실행
1) 그것을 관리 및 시정하기 위한 조치를 취함
2) 결과 처리
- 근로자 참여 및 기타 관련된 이해관계자의 개입과 아울러 다음과 같이 재발하거나 다른 곳에서 발생하지 않도록 하기 위해 사건 또는 부적합의 근본원인을 제거하기 위한 시정조치의 필요성을 평가
1) 사건 조사 또는 부적합의 검토
2) 사건 또는 부적합의 원인을 결정
3) 유사한 사건이 발생, 부적합이 존재하거나 잠재적으로 발생할 수 있는 지에 대한 결정
- 적절하게 기존 안전보건 리스크 평가 및 기타 리스크의 평가를 검토
- 관리 방법의 우선순위 및 변경관리에 따라 시정조치를 포함하여 필요한 조치를 결정 및 실행
- 조치를 취하기 전, 신규 및 변경된 안전보건 위험요인과 관련된 안전보건 리스크를 평가
- 시정조치를 포함한 취해진 조치의 효과성을 검토
- 필요한 경우, 안전보건경영시스템을 변경','시정조치 요청서');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('10.2.3.','시정조치는 당면한 사건 및 부적합의 잠재적인 영향 및 해당 영향에 적절하게 실행되는가?','시정조치 요청서');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('10.2.4.','조직은 다음의 증거로서 문서화된 정보를 보유하는가?
- 사건, 부적합 및 그에 따른 취해진 조치에 따른 특성
- 그들의 효과성을 포함한 시정조치와 해당 조치의 결과','시정조치 요청서');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('10.2.5.','조직은 이러한 문서화된 정보를 관련된 근로자, 근로자 대표가 있는 경우, 근로자의 대표자 및 기타 관련 이해관계자에게 의사소통을 하는가?','시정조치 요청서');
INSERT INTO Checklist (checklist_id, contents, viewpoint) VALUES('10.3.1.','조직은 다음과 같이 안전보건 경영시스템의 적절성, 충족성 및 효과성을 지속적으로 개선하고 있는가?
- 안전보건 성과를 강화
- 안전보건 경영시스템을 지원하는 문화 촉진
- 안전보건 경영시스템의 지속적 개선을 위한 조치를 실행하는데 있어서 근로자의 참여 촉진
- 지속적 개선의 관련 결과를 근로자 및 근로자 대표가 있는 경우, 근로자의 대표자에게 의사소통
- 지속적인 개선 증거로서 문서화된 정보를 유지 및 보유','시정조치 규정');

update checklist set is_reminder=1 where reminder_cnt!=0;


commit;

select * from Checklist where checklist_id<10
union
select * from checklist where checklist_id>10;


update checklist set main_dept='감사부' where checklist_id='4.1.2.';

insert into calender (schedule_name,start_date,end_date,alert,memo) values("공장 방문","2022-11-29","22-12-2",0,'송파구 오금역3번출구');
insert into calender (schedule_name,start_date,end_date,alert,memo) values("내부 심사","20221114","221121",0,'당일 16시까지');
insert into calender (schedule_name,start_date,end_date,alert,memo) values("연말 정산","20221214","221216",0,'여의도역');
select * from calender;

