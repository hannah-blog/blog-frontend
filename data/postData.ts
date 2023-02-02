import Post from "../components/main/Post";

export type Tag = {
  name: string,
};
export type TagList = Tag[];

export type Post = {
  id: number,
  title: string,
  content: string,
  thumbnailUrl: string,
  tags: TagList,
  createdDate: string,
};
export type PostList = Post[];

export const postData: PostList = [
  {
    id: 1,
    title: "JPA - JSON in MySQL, message converter",
    content: `<p>MySQL에 있는 json타입을 JPA로 다루어 보는 방법을 정리해보도록 하겠습니다</p><blockquote><p>MySQL json reference</p><p>https://dev.mysql.com/doc/refman/8.0/en/json.html</p></blockquote><h3>1. gradle에 종속성 추가하기</h3><div data-language="kotlin" class="toastui-editor-ww-code-block-highlighting"><pre class="language-kotlin"><code data-language="kotlin" class="language-kotlin">dependencies {
    ...
    
    // JSON in MySQL
    implementation("com.vladmihalcea:hibernate-types-52:2.16.2")
}</code></pre></div><p><br></p><h3>2. 예제 도메인 만들기</h3><p>도메인 설계는 작가 &amp; 책 으로 이루어져있으며, 이 중 책은 실제 도메인이 아니고 json타입으로 들어가는 객체입니다</p><p><br></p><p>Book.kt</p><div data-language="kotlin" class="toastui-editor-ww-code-block-highlighting"><pre class="language-kotlin"><code data-language="kotlin" class="language-kotlin">data class Book(
    var id: String = automaticNumbering(),
    val title: String,
    val price: Int,
)</code></pre></div><p>Author.kt</p><div data-language="kotlin" class="toastui-editor-ww-code-block-highlighting"><pre class="language-kotlin"><code data-language="kotlin" class="language-kotlin">@Entity
@TypeDef(name = "json", typeClass = JsonType::class)
class Author(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private val id: Long? = null,
    private val name: String,
    private val gender: Gender,
    private val age: Int,

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private var books: List&lt;Book&gt;

)</code></pre></div><ul><li><p>@TypeDef</p><ul><li><p>name은 json, typeClas는 com.vladmihalcea.hibernate.type.json.JsonType 클래스를 넣어줍니다</p></li></ul></li><li><p>@Type</p><ul><li><p>우리가 위에 선언해주었던 type name을 적어줍니다</p></li></ul></li><li><p>@Column</p><ul><li><p>DB Column 정보를 직접 json으로 설정하겠다는 의미입니다</p></li></ul></li></ul><p>그러면 진짜 간단하게 설정이 완료됩니다</p><p><br></p><h3>3. 예제 코드</h3><p>AuthorDto.kt</p><div data-language="kotlin" class="toastui-editor-ww-code-block-highlighting"><pre class="language-kotlin"><code data-language="kotlin" class="language-kotlin">data class AuthorDto(
    val id: Long?,
    val name: String,
    val gender: Gender,
    val age: Int,
    val books: List&lt;BookDto&gt;
)</code></pre></div><p>Repository.kt</p><div data-language="kotlin" class="toastui-editor-ww-code-block-highlighting"><pre class="language-kotlin"><code data-language="kotlin" class="language-kotlin">interface AuthorRepository : JpaRepository&lt;Author, Long&gt; {
}</code></pre></div><p>AuthorService.kt</p><div data-language="kotlin" class="toastui-editor-ww-code-block-highlighting"><pre class="language-kotlin"><code data-language="kotlin" class="language-kotlin">@Service
class AuthorService(private val authorRepository: AuthorRepository) {

    override fun findAuthors(): List&lt;AuthorDTO&gt; {
        val findAuthors = authorRepository.findAll()
        return findAuthors.map { author -&gt; author.toAuthorDto() }
    }
    
    @Transactional
    override fun registerAuthor(requestDTO: AuthorDTO): AuthorDTO {
        val saveAuthor = authorRepository.save(requestDTO.toEntity())
        return saveAuthor.toAuthorDto()
    }
    
    ...
}</code></pre></div><p>AuthorControllere.kt</p><div data-language="kotlin" class="toastui-editor-ww-code-block-highlighting"><pre class="language-kotlin"><code data-language="kotlin" class="language-kotlin">@RestController
class AuthorController(private val authorService: AuthorService) {

    @GetMapping(value = ["/authors"], produces = ["application/json"])
    fun findAuthors(): Success&lt;List&lt;AuthorDTO&gt;&gt; {
        val findAuthors = authorService.findAuthors()
        return Success(findAuthors, "작가 &amp; 책 목록들입니다.")
    }

    @PostMapping(value = ["/author"], produces = ["application/json"])
    fun registerAuthor(@RequestBody requestDTO: AuthorDTO): Success&lt;AuthorDTO&gt; {
        val saveAuthor = authorService.registerAuthor(requestDTO)
        return Success(saveAuthor, "저장이 완료되었습니다.")
    }
    
    ...
}</code></pre></div><h3>4. Tests</h3><p><strong>postman</strong></p><p>reuqest / response</p><p><br></p><p><img src="https://velog.velcdn.com/images/coals_0329/post/60e601d3-4e13-4bb5-a902-d1af29f6c925/image.png" contenteditable="false"><br></p><p><img src="https://velog.velcdn.com/images/coals_0329/post/789d165d-6dcb-4d41-bd21-ef83a308157a/image.png" contenteditable="false"><br></p><p><br></p><p>끗! 읽어주셔서 감사합니다 (꾸벅)</p>`,
    thumbnailUrl: "https://velog.velcdn.com/images/coals_0329/post/a4039793-a050-4f4c-a120-b16a24a51b91/image.png",
    tags: [{"name": "json"}, {"name": "kotlin"}],
    createdDate: "2022.12.13",
  },
  {
    id: 2,
    title: "MapStruct 적용기",
    content: `<p>Kotlin에 MapStruct를 적용해보겠습니다~!</p><h3>1. 의존성 주입 (gradle)</h3><div data-language="kotlin" class="toastui-editor-ww-code-block-highlighting"><pre class="language-kotlin"><code data-language="kotlin" class="language-kotlin">plugins {
    ...

    // mapStruct
    kotlin("kapt") version "1.6.21"
}

dependencies {
    ...

    // MapStruct
    implementation("org.mapstruct:mapstruct:1.5.1.Final")
    kapt("org.mapstruct:mapstruct-processor:1.5.1.Final")
    kaptTest("org.mapstruct:mapstruct-processor:1.5.1.Final")
}</code></pre></div><h3>2. Entity &amp; DTO</h3><div data-language="kotlin" class="toastui-editor-ww-code-block-highlighting"><pre class="language-kotlin"><code data-language="kotlin" class="language-kotlin">@Entity
class Member(

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    var userNickName: String,
    var age: Int,

    @Enumerated(EnumType.STRING)
    var gender: Gender

) : BaseEntity() </code></pre></div><div data-language="kotlin" class="toastui-editor-ww-code-block-highlighting"><pre class="language-kotlin"><code data-language="kotlin" class="language-kotlin">@Entity
class Score(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    val member: Member,

    @Enumerated(EnumType.STRING)
    val subject: Subject,

    val score: Int,

) : BaseEntity()</code></pre></div><div data-language="kotlin" class="toastui-editor-ww-code-block-highlighting"><pre class="language-kotlin"><code data-language="kotlin" class="language-kotlin">data class ScoreDTO(
    val id: Long?,
    val memberId: Long?,
    val memberName: String,
    val subject: Subject,
    val score: Int,
    val creationDate: Date
)</code></pre></div><h3>3. MapStruct</h3><div data-language="kotlin" class="toastui-editor-ww-code-block-highlighting"><pre class="language-kotlin"><code data-language="kotlin" class="language-kotlin">@Mapper
interface ScoreMapper {
    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "memberId", source = "member.id"),
        Mapping(target = "memberName", source = "member.userNickName"),
        Mapping(target = "subject", source = "score.subject"),
        Mapping(target = "score", source = "score.score"),
        Mapping(target = "creationDate", expression = "java(new java.util.Date())")
    )
    fun toScoreDto(score: Score, member: Member): ScoreDTO
}</code></pre></div><blockquote><p>build(실행) 결과</p></blockquote><div data-language="java" class="toastui-editor-ww-code-block-highlighting"><pre class="language-java"><code data-language="java" class="language-java">@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-07-08T15:31:12+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from kotlin-annotation-processing-gradle-1.6.21.jar, environment: Java 17.0.3 (Amazon.com Inc.)"
)
public class ScoreMapperImpl implements ScoreMapper {

    @Override
    public ScoreDTO toScoreDto(Score score, Member member) {
        if ( score == null &amp;&amp; member == null ) {
            return null;
        }

        Subject subject = null;
        int score1 = 0;
        if ( score != null ) {
            subject = score.getSubject();
            score1 = score.getScore();
        }
        Long memberId = null;
        String memberName = null;
        if ( member != null ) {
            memberId = member.getId();
            memberName = member.getUserNickName();
        }

        Long id = null;
        Date creationDate = new java.util.Date();

        ScoreDTO scoreDTO = new ScoreDTO( id, memberId, memberName, subject, score1, creationDate );

        return scoreDTO;
    }
}</code></pre></div><p>테스트까지 성공!</p><h3>📛 public? private?</h3><p>순탄하게 테스트 코드를 짜면서 돌리던중... 에러가 발생했습니다</p><div data-language="text" class="toastui-editor-ww-code-block-highlighting"><pre><code>C:\\{filePath}\\domain\\author\\AuthorMapper.java:10: warning: Unmapped target properties: "books, id, name, gender, age".
    public abstract com.example.kotlinserver.dto.author.AuthorDTO toAuthorDto(@org.jetbrains.annotations.NotNull</code></pre></div><p>읭?? 뭐지 하다가 값을 분명히 넘겼는데 에러가 뜨니 당황스러웠습니다</p><p>어떤게 문제일까 코드를 분석하던 도중</p><div data-language="java" class="toastui-editor-ww-code-block-highlighting"><pre class="language-java"><code data-language="java" class="language-java">@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-07-08T16:00:02+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from kotlin-annotation-processing-gradle-1.6.21.jar, environment: Java 17.0.3 (Amazon.com Inc.)"
)
public class AuthorMapperImpl implements AuthorMapper {

    @Override
    public AuthorDTO toAuthorDto(Author author) {
        if ( author == null ) {
            return null;
        }

        Long id = null;
        String name = null;
        Gender gender = null;
        int age = 0;
        List&lt;BookDTO&gt; books = null;

        AuthorDTO authorDTO = new AuthorDTO( id, name, gender, age, books );

        return authorDTO;
    }
}</code></pre></div><p>뭔가 잘못됐다는걸 느꼈습니다 보통의 mapper라면 분명 값을 세팅하는 로직이 있을텐데 그 로직이 없던것이었습니다 그렇게 분석 도중... 원인을 찾았습니다!!</p><div data-language="kotlin" class="toastui-editor-ww-code-block-highlighting"><pre class="language-kotlin"><code data-language="kotlin" class="language-kotlin">@Entity
@TypeDef(name = "json", typeClass = JsonType::class)
class Author(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private val id: Long? = null,
    private val name: String,
    private val gender: Gender,
    private val age: Int,

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private var books: List&lt;Book&gt;

) : BaseEntity()</code></pre></div><p>entity에 접근제어가 필요하다고 생각하는 저는 private을 붙인 상황이었고 MapStruct는 만들어지는 대상은 Getter, 만드는 대상은 Setter가 필요했기때문에 에러가 났던 것 입니다</p><p>아무래도 java 기반이다 보니 그런것 같아 private을 빼고 테스트 코드를 돌려보니 성공했습니다 :-)</p><p><br></p><p><em>converter하는 작업은 극히 개인적인 성향, 취향이라고 생각하기때문에 팀원들과 코드 스타일을 맞출 때 협의하는게 좋을것 같습니다</em></p><h3>추가</h3><p>저번에 포스트했던 json type으로 저장한게 생각나서 해봤습니다</p><p>많은 삽질을 하겠다고 예상했지만... 예상외로 간단하게 되서 놀랐습니다...</p><div data-language="kotlin" class="toastui-editor-ww-code-block-highlighting"><pre class="language-kotlin"><code data-language="kotlin" class="language-kotlin">@Mapper
interface AuthorMapper {
    fun toAuthorDto(author: Author): AuthorDTO
}</code></pre></div><p><br></p><p><br></p><p>레퍼런스 주소</p><p>(++ 참고 사이트)</p><p>https://mapstruct.org/documentation/stable/reference/html/</p><p>https://mangchhe.github.io/spring/2021/01/25/ModelMapperAndMapStruct/</p><p><br></p><p><br></p><p>읽어주셔서 감사합니다🥰🥰🥰</p><blockquote><p>좌충우돌 kotlin spring boot project 생성기 https://github.com/HongChaeMin/kotlin/tree/main/kotlinServer</p></blockquote>`,
    thumbnailUrl: "https://velog.velcdn.com/images/coals_0329/post/87ff60ed-852c-472e-b66a-066581f51517/image.png",
    tags: [{"name": "kotlin"}, {"name": "mapstruct"}],
    createdDate: "2022.12.13"
  },
  {
    id: 3,
    title: "GC - 기본 알고리즘과 동작 방식",
    content: `<h1>들어가기 전...</h1><h3>JVM의 메모리 구조</h3><ol><li><p>메소드 영역</p><ul><li><p>클래스 멤버 변수의 이름, 데이터 타입, 접근 제어자 정보같은 필드 정보와 메소드의 이름, 리턴 타입, 파라미터, 접근 제어자 정보같은 메소드 정보, Type정보(Interface인지 class인지), Runtime Constant Pool(문자 상수, 타입, 필드에 대한 레퍼런스가 저장됨), static 변수, final class 변수등이 생성되는 영역</p></li></ul></li><li><p>힙 영역</p><ul><li><p>new 키워드로 생성된 객체와 배열이 저장되는 영역</p></li><li><p>String constant pool : 문자열 리터럴을 저장하는 공간 (String str = “abc” 에서 “abc” 부분)</p></li><li><p>메소드 영역에 로드된 클래스만 생성이 가능하고 Garbage Collector가 참조되지 않는 메모리를 확인하고 제거하는 영역</p></li></ul></li><li><p>스택 영역</p><ul><li><p>지역 변수, 파라미터, 리턴 값, 연산에 사용되는 임시 값등이 생성되는 영역</p></li></ul></li><li><p>PC Register</p><ul><li><p>Thread(쓰레드)가 생성될 때마다 생성되는 영역으로 Program Counter 즉, 현재 쓰레드가 실행되는 부분의 주소와 명령을 저장하고 있는 영역. (<em>CPU의 레지스터와 다름</em>)</p></li></ul></li><li><p>Native method stack</p><ul><li><p>자바 외 언어로 작성된 네이티브 코드를 위한 메모리 영역</p></li></ul></li></ol><h3>Garbage Collection의 장단점</h3><p><strong>장점</strong></p><ul><li><p>메모리를 수동으로 관리하던 것에서 비롯된 에러를 예방할 수 있다</p><ul><li><p>개발자의 실수로 인한 메모리 누수</p></li><li><p>해제된 메모리를 또 해제하는 이중 해제</p></li><li><p>해제된 메모리에 접근</p></li></ul></li></ul><p><strong>단점</strong></p><ul><li><p>GC의 메모리 해제 타이밍을 개발자가 정확히 알기 어렵다</p></li><li><p>어떠한 메모리 영역이 해제의 대상이 될 지 검사하고, 실제로 해제하는 일이 모두 오버헤드다</p></li></ul><h3>Garbage Collection이 지키는 두 가지 원칙</h3><ul><li><p>반드시 모든 Garbage(쓰지 않는 메모리)를 수집(free)해야한다</p><p>메모리만 엄청 빵빵하다면 Garnage가 많더라도 굳이 메모리 해제할 필요가 없다</p><p>사실 GC도 메모리가 부족할 때만 수행한다</p></li><li><p>살아있는 객체(접근 가능한 객체)는 절대로 수집해선 안 된다</p><p>C언어에서는 살아있는 객체(접근 가능한 객체)를 해제하면 Dangling pointer가 만들어지고, 어플리케이션이 뻗거나 해당 메모리에 다른 데이터가 할당돼서 해당 데이터를 더럽히는 등의 버그가 발생하게 된다</p><p>자바에서는 살아있는 객체를 수집해가면 나중에 참조하는 쪽에서 NPE(NullPointerException) 등등이 발생할 가능성이 높다</p></li></ul><h1>1. Garbage Collenction 전체 구조</h1><p><img src="https://velog.velcdn.com/images/coals_0329/post/7ecf59a4-b496-4815-92dd-de471627d188/image.png" contenteditable="false"><br></p><h3>1-1. Young Generation</h3><ul><li><p>새롭게 생성된 객체가 할당(Allocation)되는 영역</p></li><li><p>대부분의 객체가 금방 접근 불가능힌(Unreachable) 상태가 되기 때문에 많은 객체가 Young 영역에 생성되었다가 사라진다</p></li><li><p>Young 영역에 대한 GC를 Minor GC라고 부른다</p></li></ul><h3>1-2. Old Generation</h3><ul><li><p>Young 영역에서 접근 가능(Reachable) 상태를 유지하여 살아남은 객체가 복사되는 영역</p></li><li><p>대부분 Young 영역보다 크게 할당하며, 크기가 큰 만큼 Young 영역보다 GC는 적게 발생한다</p></li><li><p>Old 영역에 대한 GC를 Major GC 또는 Full GC라고 부른다</p></li></ul><h3>1-3. Card Table</h3><ul><li><p>512바이트의 덩어리(chunk)</p></li><li><p>참조</p><ul><li><p>Old Generation이 Young Generation을 참조할 때</p><ul><li><p>Card Table에서 정보를 표시해줌</p></li></ul></li><li><p>Young Generation이 Old Generation을 참조할 때</p><ul><li><p>Card Table에서만 GC 대상인지 확인</p></li></ul></li></ul></li></ul><h3>1-4. Permanent Gerneration</h3><ul><li><p>Perm 영역은 Method Area라고도 한다</p></li><li><p>객체나 억류(intern)된 문자열 정보를 저장하는 곳</p></li><li><p>여기서 GC가 발생해도 Major GC의 횟수에 포함된다</p></li></ul><h1>2. Algorithm</h1><h3>2-0. <em>Weak Generational Hypothesis</em></h3><ul><li><p>GC 를 성공적으로 수행하는 Algorithm 을 설계하기 위해서는 몇 가지 가설이 필요힌데 그 중 하나가 Weak Generationval 가설이다</p></li><li><p>이 가설은 대부분의 객체는 빠르게 Unreachable 한 상태로 전환이 된다고 보고 있다</p></li></ul><blockquote><p>VM 및 유사 소프트웨어에서 객체 수명은 이원적 분포 양상을 보인다</p><p>대부분의 객체는 아주 짧은 시간만 살아있지만, 나머지 객체는 기대 수명이 훨씬 길다</p></blockquote><p><img src="https://velog.velcdn.com/images/coals_0329/post/4a5285bc-d01f-4a0e-b44e-9715bc1129d4/image.png" contenteditable="false"><br></p><h3>2-1. Mark And Sweep</h3><ul><li><p>GC의 가장 기본적인 알고리즘이다</p></li><li><p>크게 두 단계로 나뉘어져 있다</p></li></ul><p><strong>단계</strong></p><ol><li><p>Mark 단계 : 사용되는 메모리와 사용되지 않은 메모리 식별 작업</p><ul><li><p>객체가 생성되면 비트를 0(false)로 표시한다</p></li><li><p>깊이우선 탐색기법(depth first search approach)을 사용해서 접근할 수 있는 모든 노드(객체 또는 사용자)들을 방문한다</p></li><li><p>마크 페이즈에서는 모든 도달 가능한 객체 또는 사용자가 참조할수 있는 객체에 1(true)가 찍힌다</p></li></ul></li><li><p>Sweep 단계 : Mark 단계에서 사용되지 않음으로 식별된 메모리를 해제하는 작업</p><ul><li><p>힙 메모리에 있는 모든 도달 불가능한 객체를 치워버린다</p></li><li><p>marked 값이 false로 설정된 모든 객체는 정리되고, true인 객체는 유지한다</p></li></ul></li></ol><p><img src="https://velog.velcdn.com/images/coals_0329/post/a5cf3b15-c9f8-48cd-a776-7dedc42a4546/image.png" contenteditable="false"><br></p><p><br></p><p><strong>Mark And Sweep 단점</strong></p><ul><li><p>Garbage Collection 수행중엔 프로그램의 실행이 잠시 중단된다 (Stop The World)</p></li><li><p>메모리가 Fragmentation, 단편화된다</p><p>메모리에서의 단편화는 정렬되지 않은 조각으로 나뉘어져, 절대적인 크기는 충분하지만 추가적으로 메모리 할당이 되기 힘든 상태를 의미한다</p></li></ul><p><img src="https://velog.velcdn.com/images/coals_0329/post/22799d3a-7c26-4e8f-b8b5-bc091e086fbc/image.png" contenteditable="false"><br></p><h3>2-2. Mark And Compact</h3><ul><li><p>Mark And Sweep Algorithm 의 단점을 보안한 알고리즘이다</p></li><li><p>Mark And Sweep Algorithm 처럼 참조되는 객체들에 대해서 마크를 하고, 참조되지 않으면 삭제한다</p></li><li><p>이후에 메모리를 정리하여, 메모리 단편화를 해결할 수 있도록 한다</p></li><li><p>많은 GC 방식들이 이 Algorithm 을 바탕으로 하여 구현되고 있다</p></li></ul><p><img src="https://velog.velcdn.com/images/coals_0329/post/ecbe631f-5ddb-4db3-8005-eae77615b51e/image.png" contenteditable="false"><br></p><h1>3. Mechanism</h1><h3>3-1. Minor GC</h3><ul><li><p>Young Generation에서 발생하는 GC를 Minor GC라고 부른다</p></li><li><p>Young Generation에서 Eden, Survival 0, Survival 1 영역으로 나뉜다</p><ul><li><p>Eden : 새롭게 생성된 객체들이 할당되는 영역</p></li><li><p>Survival</p><ul><li><p>Minor GC에서 살아남은 객체들이 존재하는 영역</p></li><li><p>이때 Survival 영역에서 Survival 0과 Survival 1 중 하나는 꼭 비어 있어야 한다는 규칙이 있다</p></li></ul></li></ul></li><li><p>Minor GC의 실행 타이밍은 바로 Eden 영역이 꽉 찼을 때이다</p></li></ul><ol><li><p><img src="https://velog.velcdn.com/images/coals_0329/post/281469f2-b035-4883-90f5-336dc23548a2/image.png" contenteditable="false"><br></p></li></ol><ul><li><p>그림에서 회색 네모는 메모리에 할당된 객체를 생각하면 된다</p></li><li><p>Minor GC가 발생하고 난 뒤 Reachable이라 판단된 객체는 Survival 0 영역으로 옮겨진다</p></li></ul><ol start="2"><li><p><img src="https://velog.velcdn.com/images/coals_0329/post/3a0b25d9-3290-4340-8c22-bacdcaef6409/image.png" contenteditable="false"><br></p></li></ol><ul><li><p>이때 살아 남은 객체들의 숫자들이 0에서 1로 변한 것을 알 수 있는데, 이는 age bit를 뜻한다</p></li><li><p>Minor GC에서 살아남은 객체는 age bit가 1씩 증가</p></li></ul><ol start="3"><li><p><img src="https://velog.velcdn.com/images/coals_0329/post/5133b64f-f733-449e-8732-e945c7172663/image.png" contenteditable="false"><br></p></li></ol><ul><li><p>또 다시 Eden 영역이 꽉찼다</p></li></ul><ol start="4"><li><p><img src="https://velog.velcdn.com/images/coals_0329/post/6335a37c-8bd0-4188-83fd-12844a4237dc/image.png" contenteditable="false"><br></p></li></ol><ul><li><p>그러면 Minor GC가 발생하여 Reachable이라 판단된 객체들은 Survival 1 영역으로 이동한다</p></li><li><p>Minor GC의 대상이 Eden에만 국한되는 게 아니라 Survivor 영역까지 Minor GC를 하기 때문에 Survival 0에 있는 것도 Survival 1 영역으로 옮겨지면서 age bit가 늘어난다</p></li></ul><ol start="5"><li><p><img src="https://velog.velcdn.com/images/coals_0329/post/0288142b-8cf2-4248-9f43-947bd8fb850a/image.png" contenteditable="false"><br></p></li></ol><ul><li><p>이후 또 Eden 영역이 꽉찼다</p></li></ul><ol start="6"><li><p><img src="https://velog.velcdn.com/images/coals_0329/post/d3ade3f6-e86e-495e-9df8-53c9edfd46bf/image.png" contenteditable="false"><br></p></li></ol><ul><li><p>Minor GC가 발생하여 Reachable이라 판단된 객체들은 Survival 0 영역으로 이동한다</p></li><li><p>어느덧 Survival 0 영역으로 넘어 온 객체 중 오래 살아 남아 age bit가 3이 된 객체가 보인다</p></li></ul><ol start="7"><li><p><img src="https://velog.velcdn.com/images/coals_0329/post/89f4ff28-1361-4154-82dd-a26fbb81f727/image.png" contenteditable="false"><br></p></li></ol><ul><li><p>JVM GC에서는 일정 수준의 age bit를 넘어가면 오래도록 참조될 객체라고 판단하고, 해당 객체를 Old Generation에 넘겨 주는데, 이를 Promotion이라 부른다</p></li><li><p>Java 8에서는 Parallel GC 방식 기준으로 age bit가 15가 되면 Promotion이 진행된다</p></li><li><p>예제에서는 age bit가 3이 될 경우를 Promotion의 기준으로 잡았다</p><p>그래서 Survival 0 영역의 age bit가 3인 객체가 Old Generation으로 Promotion되었다</p></li></ul><h3>3-2. Major GC</h3><p><img src="https://velog.velcdn.com/images/coals_0329/post/8b55c561-6124-483a-ac4d-3433448ba7be/image.png" contenteditable="false"><br></p><ul><li><p>시간이 아주 많이 지나면 언젠간 Old Generation도 다 채워지는 날이 올텐데, 이때 Major GC가 발생하면서 Mark And Sweep 방식을 통해 필요 없는 메모리를 비우는데, Minor GC에 비해 시간이 오래 걸린다</p></li><li><p>이때 Minor GC 보다 Major GC가 Stop The World 현상이 더 길다</p></li></ul><p><br></p><p><br></p><p>다음 포스트에는 GC의 종류에 대해서 설명하겠다</p><blockquote><p>원본 파일</p><p>https://www.figma.com/file/ObHooF2KuUVQxbN2l9OSrG/GC?node-id=429%3A1133</p></blockquote>`,
    thumbnailUrl: "https://velog.velcdn.com/images/coals_0329/post/7ecf59a4-b496-4815-92dd-de471627d188/image.png",
    tags: [{"name": "GC"}],
    createdDate: "2022.12.13"
  },
  {
    id: 4,
    title: "@Async",
    content: `## 사용법 (Spring Boot)
spring boot에서 @Async를 사용하는 방법은 간단합니다
1. applicationClass에 @EnableAsync를 선언합니다
\`\`\`java
@EnableAsync
@SpringBootApplication
public class SpringBootApplication {
    ...
}
\`\`\`
2. 비동기로 작동하길 원하는 로직 함수 위에 @Async annotation을 붙어줍니다
\`\`\`java
public class AsyncClass {
\t
    @Async
    public void asyncMethod(String param) {
    \t...
    }
    
}
\`\`\`

---

## 설정
spring은 기본값으로 SimpleAsyncTaskExecutor를 사용하여 실제 메소드들을 비동기로 실행합니다
설정은 두 가지 레벨로 오버라이드할 수 있습니다
1. 메소드 레벨로 실행자 오버라이드 하기
*설정 코드*
\`\`\`java
@Configuration
@EnableAsync // 설정 클래스에 붙이기
public class SpringAsyncConfig {
     
    @Bean(name = "threadPoolTaskExecutor")
    public Executor threadPoolTaskExecutor() {
        return new ThreadPoolTaskExecutor();
    }
}
\`\`\`
*사용 코드 : 속성 값으로 사용합니다 (bean의 이름값)*
\`\`\`java
@Async("threadPoolTaskExecutor")
public void asyncMethodWithConfiguredExecutor() {
    System.out.println("Execute method with configured executor - "  + Thread.currentThread().getName());
}
\`\`\`
2. 어플리케이션 레벨로 실행자 오버라이드 하기
*설정 코드 : AsyncConfigurer를 구현해줍니다*
\`\`\`java
@Configuration
@EnableAsync // 설정 클래스에 붙이기
public class SpringAsyncConfig implements AsyncConfigurer {
     
    @Override
    public Executor getAsyncExecutor() {
        return new ThreadPoolTaskExecutor();
    }
     
}
\`\`\`
3. 옵션
- ThreadPoolTaskExecutor
\t- setCorePoolSize : 코어 스레드가 시간 초과되도록 허용할지 여부를 지정합니다
    - setMaxPoolSize : ThreadPoolExecutor의 최대 풀 크키글 설정합니다
    - setQueueCapacity : ThreadPoolExecutor의 BlockingQueue(max pool size 초과 요청 시 요청을 queue에 저장하는데 이때 최대 수용가능한 queue의 수)에 대한 용량을 설정합니다
    - initialize : 대상 ExecutorService 인스턴스를 만듭니다
- https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/concurrent/ThreadPoolTaskExecutor.html

> 커스텀 설정이나, 풀을 사용할 때에는 application class에서 @EnableAsync를 제거합니다
> 런타임 시 @Configuration이 설정된 AsyncConfig 클래스를 읽어들이기 때문입니다

---

## 리턴 타입
1. Future
- 메소드의 결과를 전달받아야 한다면, Future를 사용해야 합니다
- 스프링에서 제공하는 AsyncResult는 Future의 구현체 입니다

*비동기 메소드*
\`\`\`java
@Async
public Future<String> getFuture(String str) throws InterruptedException {
\t...
\treturn new AsyncResult<>(str);
}
\`\`\`
*비동기 메소드 사용 코드*
\`\`\`java
Future<String> future = service.getFuture("test");
future.get();
\`\`\`
- future의 get 메소드는 결과를 조회할 때까지 계속 기다립니다
- 즉, 메서드의 수행이 완료될 때 까지 기다려야하며, 블록킹 현상이 발생합니다

2. Listenablefuture

*비동기 메소드*
\`\`\`java
@Async
public ListenableFuture<String> getFuture(String str) throws InterruptedException {
\t...
\treturn new AsyncResult<>(str);
}
\`\`\`
*비동기 메소드 사용 코드*
\`\`\`java
Listenablefuture<String> future = service.getFuture("test");
future.addCallback(f -> log.info("{}", f));
\`\`\`
- addCallback 메소드는 비동기 메소드의 내부 로직이 완료되면 수행되는 콜백 기능입니다

3. CompletableFuture

*비동기 메소드*
\`\`\`java
@Async
public CompletableFuture<String> getFuture(String str) throws InterruptedException {
\t...
\treturn new AsyncResult<>(str).completable();
}
\`\`\`
*비동기 메소드 사용 코드*
\`\`\`java
CompletableFuture<String> future = service.getFuture("test");
future.thenAccept(f -> log.info("{}", f));
\`\`\`
- thenAccept 메소드는 비동기 메소드의 결과를 기다리지 않고 다음 작업을 계속 수행할 수 있게 해줍니다
- 더 많은 함수를 사용할 수 있습니다
-  https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html

---

## 에러 처리
1. 리턴 타입이 Future 타입인 경우

*구현 코드 : AsyncUncaughtExceptionHandler를 상속받습니다*

\`\`\`java
@Configuration
@EnableAsync
public class AsyncExceptionHandler implements AsyncConfigurer {
    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new CustomAsyncExceptionHandler();
    }
}
\`\`\`
2. 리턴 타입이 void인 경우

*구현 코드 : 리턴 타입인 void인 경우 예회가 호출 스레드로 전파되지 않기 때문에 따로 예외처리를 해주어야합니다*
\`\`\`java
public class AsyncExceptionHandler implements AsyncUncaughtExceptionHandler {

    @Override
    public void handleUncaughtException(Throwable ex, Method method, Object... params) {
\t    ...
    }
}
\`\`\`

---

## 주의사항

1. private method는 사용이 불가합니다
\t- @Async의 동작은 AOP가 적용됩니다 (@Async가 적용된 method의 경우 스프링이 메소드를 가로채 다른 스레드에서 실행 시켜주는 동작 방식입니다)
    - 떼문에 Spring이 @Async 메소드를 가로챈 후, 다른 클래스에서 호출이 가능해야하므로 privat 메소드는 사용할 수 없습니다
2. self-invocation은 불가합니다 (inner method)
\t- 같은 객체 내의 메소드끼리 호출할 시 AOP가 동작하지 않기 때문에 비동기로 동작하지 않습니다.

---

읽어주셔서 감사합니다!

참고 사이트

https://spring.io/guides/gs/async-method/

https://steady-coding.tistory.com/611

https://velog.io/@gillog/Spring-Async-Annotation%EB%B9%84%EB%8F%99%EA%B8%B0-%EB%A9%94%EC%86%8C%EB%93%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

https://brunch.co.kr/@springboot/401`,
    thumbnailUrl: "https://velog.velcdn.com/images/coals_0329/post/fb9545e2-baf3-44b9-8bd8-6b983999d9b4/image.png",
    tags: [{"name": "java"}, {"name": "spring"}, {"name": "async"}],
    createdDate: "2022.12.13"
  },
];

export const getPostById = (id: number): Post => {
  let returnValue: Post = {
    id: 0,
    title: "블로그가 존재하지 않습니다.",
    content: "블로그가 존재하지 않습니다.",
    thumbnailUrl: "블로그가 존재하지 않습니다.",
    tags: [],
    createdDate: "블로그가 존재하지 않습니다.",
  };
  postData.forEach(value => {
    if (value.id === id) returnValue = value;
  });
  return returnValue;
}
