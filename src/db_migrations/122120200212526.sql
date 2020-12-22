-- Table: public.document

-- DROP TABLE public.document;

CREATE TABLE public.document
(
    document_id SERIAL,
    title character varying(50) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    image character varying(100) COLLATE pg_catalog."default" NOT NULL,
    date_last_edited timestamp without time zone NOT NULL DEFAULT now(),
    search_tokens tsvector,
    CONSTRAINT document_pkey PRIMARY KEY (document_id)
)

TABLESPACE pg_default;

ALTER TABLE public.document
    OWNER to postgres;